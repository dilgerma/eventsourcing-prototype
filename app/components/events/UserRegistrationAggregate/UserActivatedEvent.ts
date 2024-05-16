import type {Event} from '@event-driven-io/emmett';

export type UserActivatedEvent = Event<
    'UserActivatedEvent',
    {
        email: string
    }
>;
