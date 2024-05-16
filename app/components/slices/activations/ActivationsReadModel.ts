import type {Event, ReadStreamResult} from '@event-driven-io/emmett';
import {findEventStore} from '@/app/core/infrastructure/inmemoryEventstore';
import {
    UserRegistrationAggregateEvents
} from "@/app/core/events/UserRegistrationAggregate/UserRegistrationAggregateEvents"


export type Activation = {
    email: string
    activationCode: string
}

export type ActivationsReadModel = {

    activations: Activation[]

}

export const initialState = (): ActivationsReadModel => {
    return {
        activations: []
    };
}

export const evolve = (state: ActivationsReadModel, _eventData: UserRegistrationAggregateEvents): ActivationsReadModel => {
    const {type, data} = _eventData;
    switch (type) {

        case 'UserNotifiedEvent':
            return {
                activations: [...state.activations, {
                    email: data.email,
                    activationCode: data.activationCode
                }],

            }
        case 'UserActivatedEvent':

            return {
                activations: [...state.activations.filter(it => it.email !== data.email)]
            }
        default:
            return state
    }
}

export const loadFromStream = async (streamId: string, initialState: ActivationsReadModel): Promise<ActivationsReadModel> => {

    var eventStore = findEventStore();
    //@ts-ignore
    let data = await eventStore.readStream(streamId)
    var events = data?.events as (UserRegistrationAggregateEvents)[]
    var result = events?.reduce((acc: ActivationsReadModel, eventData: (UserRegistrationAggregateEvents)) => evolve(acc, eventData), initialState) || initialState

    //@ts-ignore
    return result
}
