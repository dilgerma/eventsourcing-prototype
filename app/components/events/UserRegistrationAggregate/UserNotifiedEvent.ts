import type { Event } from '@event-driven-io/emmett';

export type UserNotifiedEvent = Event<
    'UserNotifiedEvent',
    {
		email:string
		activationCode:string
    }
>;
