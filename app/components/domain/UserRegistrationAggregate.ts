import type {Event} from '@event-driven-io/emmett';
import type {
    UserRegistrationAggregateEvents
} from '@/app/core/events/UserRegistrationAggregate/UserRegistrationAggregateEvents';

export type UserRegistrationAggregate = {}

export const initialState = (): UserRegistrationAggregate => {
    return {};
}

export const mapToStreamId = (id: string) => {
    return `UserRegistrationAggregate`;
}

export const evolve = (state: UserRegistrationAggregate, _eventData: UserRegistrationAggregateEvents): UserRegistrationAggregate => {
    const {type, data} = _eventData;
    switch (type) {

        case 'PasswordChangedEvent':
            return {
                ...state,
                //TODO email:data.email,
                //TODO password:data.password
            }

        case 'UserActivatedEvent':
            return {
                ...state,
                //TODO email:data.email
            }

        case 'UserNotifiedEvent':
            return {
                ...state,
                //TODO email:data.email,
                //TODO activationCode:data.activationCode
            }

        case 'UserRegisteredEvent':
            return {
                ...state,
                //TODO Name:data.Name,
                //TODO email:data.email
            }
        default:
            return state
    }
}
