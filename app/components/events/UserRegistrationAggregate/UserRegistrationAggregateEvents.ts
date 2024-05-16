import {UserRegisteredEvent} from "@/app/components/events/UserRegistrationAggregate/UserRegisteredEvent"
import {UserNotifiedEvent} from "@/app/components/events/UserRegistrationAggregate/UserNotifiedEvent"
import {UserActivatedEvent} from "@/app/components/events/UserRegistrationAggregate/UserActivatedEvent"
import {PasswordChangedEvent} from "@/app/components/events/UserRegistrationAggregate/PasswordChangedEvent"
import {AccountConfirmedEvent} from "@/app/components/events/UserRegistrationAggregate/AccountConfirmedEvent"

export type UserRegistrationAggregateEvents =
    UserRegisteredEvent|
	UserNotifiedEvent|
	UserActivatedEvent|
	PasswordChangedEvent|
	AccountConfirmedEvent
