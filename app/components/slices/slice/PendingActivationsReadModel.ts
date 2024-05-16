import type { Event, ReadStreamResult } from '@event-driven-io/emmett';
import {findEventStore} from '@/app/core/infrastructure/inmemoryEventstore';
import { UserRegistrationAggregateEvents } from "@/app/core/events/UserRegistrationAggregate/UserRegistrationAggregateEvents"

export type PendingActivationsReadModel = {

		email:string
		activationCode:string
}

export const initialState = (): PendingActivationsReadModel => {
    return {
        		email:"",
		activationCode:""
    };
}

export const evolve = (state: PendingActivationsReadModel, _eventData: UserRegistrationAggregateEvents): PendingActivationsReadModel => {
    const {type, data} = _eventData;
    switch(type) {
        
		case 'UserNotifiedEvent':
            return {
            	...state,
            				email:data.email,
			activationCode:data.activationCode
            }
		default: return state
    }
}

export const loadFromStream = async (streamId: string, initialState:PendingActivationsReadModel): Promise<PendingActivationsReadModel> => {
            
            var eventStore = findEventStore();
            //@ts-ignore
            let data = await eventStore.readStream(streamId)
            var events = data?.events as (UserRegistrationAggregateEvents)[]
            return events?.reduce((acc:PendingActivationsReadModel, eventData:(UserRegistrationAggregateEvents)) => evolve(acc, eventData), initialState)
        }
