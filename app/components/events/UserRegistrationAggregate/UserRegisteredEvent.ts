import type {Event} from '@event-driven-io/emmett';

export type UserRegisteredEvent = Event<
    'UserRegisteredEvent',
    {
        Name: string
        email: string
    }
>;
