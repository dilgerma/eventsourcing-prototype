import type { Event, ReadStreamResult } from '@event-driven-io/emmett';
import {findEventStore} from '@/app/core/infrastructure/inmemoryEventstore';
import { UserRegistrationAggregateEvents } from "@/app/core/events/UserRegistrationAggregate/UserRegistrationAggregateEvents"

export type ConfirmedAccountReadModel = {

		email:string
}

export const initialState = (): ConfirmedAccountReadModel => {
    return {
        		email:""
    };
}

export const evolve = (state: ConfirmedAccountReadModel, _eventData: UserRegistrationAggregateEvents): ConfirmedAccountReadModel => {
    const {type, data} = _eventData;
    switch(type) {
        
		case 'AccountConfirmedEvent':
            return {
            	...state,
            				email:data.email
            }
		default: return state
    }
}

export const loadFromStream = async (streamId: string, initialState:ConfirmedAccountReadModel): Promise<ConfirmedAccountReadModel> => {
            
            var eventStore = findEventStore();
            //@ts-ignore
            let data = await eventStore.readStream(streamId)
            var events = data?.events as (UserRegistrationAggregateEvents)[]
            return events?.reduce((acc:ConfirmedAccountReadModel, eventData:(UserRegistrationAggregateEvents)) => evolve(acc, eventData), initialState)
        }
