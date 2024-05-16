import type { Event } from '@event-driven-io/emmett';

export type AccountConfirmedEvent = Event<
    'AccountConfirmedEvent',
    {
		email:string
    }
>;
