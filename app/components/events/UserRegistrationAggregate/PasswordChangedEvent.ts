import type {Event} from '@event-driven-io/emmett';

export type PasswordChangedEvent = Event<
    'PasswordChangedEvent',
    {
        email: string
        password: string
    }
>;
