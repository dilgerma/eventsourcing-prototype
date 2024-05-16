import type {Event, ReadStreamResult} from '@event-driven-io/emmett';
import {findEventStore} from '@/app/core/infrastructure/inmemoryEventstore';
import {
    UserRegistrationAggregateEvents
} from "@/app/core/events/UserRegistrationAggregate/UserRegistrationAggregateEvents"


export type Registration = {
    Name: string
    email: string
}

export type UserRegistrationReadModel = {

    registrations: Registration[]

}

export const initialState = (): UserRegistrationReadModel => {
    return {
        registrations: []
    };
}

export const evolve = (state: UserRegistrationReadModel, _eventData: UserRegistrationAggregateEvents): UserRegistrationReadModel => {
    const {type, data} = _eventData;
    switch (type) {

        case 'UserRegisteredEvent':
            return {
                registrations: [...state.registrations, {
                    email: data.email,
                    Name: data.Name
                }],

            }
        case 'UserNotifiedEvent':
            return {
                registrations: [...state.registrations.filter(it => it.email !== data.email)]
            }
        default:
            return state
    }
}

export const loadFromStream = async (streamId: string, initialState: UserRegistrationReadModel): Promise<UserRegistrationReadModel> => {

    var eventStore = findEventStore();
    //@ts-ignore
    let data = await eventStore.readStream(streamId)
    var events = data?.events as (UserRegistrationAggregateEvents)[]
    //@ts-ignore
    return events?.reduce((acc: UserRegistrationReadModel, eventData: (UserRegistrationAggregateEvents)) => evolve(acc, eventData), initialState) || initialState
}
