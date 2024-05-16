import {PasswordChangedEvent} from "@/app/components/events/UserRegistrationAggregate/PasswordChangedEvent"
import {UserActivatedEvent} from "@/app/components/events/UserRegistrationAggregate/UserActivatedEvent"
import {UserNotifiedEvent} from "@/app/components/events/UserRegistrationAggregate/UserNotifiedEvent"
import {UserRegisteredEvent} from "@/app/components/events/UserRegistrationAggregate/UserRegisteredEvent"

export type UserRegistrationAggregateEvents =
    PasswordChangedEvent |
    UserActivatedEvent |
    UserNotifiedEvent |
    UserRegisteredEvent
