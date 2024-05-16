import type { Event, ReadStreamResult } from '@event-driven-io/emmett';
import {findEventStore} from '@/app/core/infrastructure/inmemoryEventstore';
import { UserRegistrationAggregateEvents } from "@/app/core/events/UserRegistrationAggregate/UserRegistrationAggregateEvents"

export type RegisteredUsersReadModel = {

		Name:string
		email:string
}

export const initialState = (): RegisteredUsersReadModel => {
    return {
        		Name:"",
		email:""
    };
}

export const evolve = (state: RegisteredUsersReadModel, _eventData: UserRegistrationAggregateEvents): RegisteredUsersReadModel => {
    const {type, data} = _eventData;
    switch(type) {
        
		case 'UserRegisteredEvent':
            return {
            	...state,
            				Name:data.Name,
			email:data.email
            }
		default: return state
    }
}

export const loadFromStream = async (streamId: string, initialState:RegisteredUsersReadModel): Promise<RegisteredUsersReadModel> => {
            
            var eventStore = findEventStore();
            //@ts-ignore
            let data = await eventStore.readStream(streamId)
            var events = data?.events as (UserRegistrationAggregateEvents)[]
            return events?.reduce((acc:RegisteredUsersReadModel, eventData:(UserRegistrationAggregateEvents)) => evolve(acc, eventData), initialState)
        }
