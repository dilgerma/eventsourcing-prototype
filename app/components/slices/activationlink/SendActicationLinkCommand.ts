import {Command, CommandHandler} from '@event-driven-io/emmett';
import {
    UserRegistrationAggregateEvents
} from "@/app/components/events/UserRegistrationAggregate/UserRegistrationAggregateEvents"
import {UserRegistrationAggregate} from "@/app/components/domain/UserRegistrationAggregate"
import {findEventStore} from '@/app/core/infrastructure/inmemoryEventstore';
import {UserNotifiedEvent} from "@/app/components/events/UserRegistrationAggregate/UserNotifiedEvent"
import {
    evolve as userRegistrationAggregateEvolve,
    initialState as userRegistrationAggregateInitialState,
    mapToStreamId as userRegistrationAggregateMapToStreamId
} from "@/app/components/domain/UserRegistrationAggregate"

export type SendActicationLinkCommand = Command<
    'SendActicationLinkCommand',
    {
        email: string
        Name: string
        activationLink: string
    }
>;

const _handleUserRegistrationAggregate = (command: SendActicationLinkCommand, state: UserRegistrationAggregate): UserRegistrationAggregateEvents[] => {
    return [{
        type: 'UserNotifiedEvent',
        data: {
            email: command.data.email,
            activationCode: command.data.activationLink
        }
    }]
}


const userRegistrationAggregateHandler = CommandHandler(userRegistrationAggregateEvolve, userRegistrationAggregateInitialState, userRegistrationAggregateMapToStreamId)


export const handleSendActicationLinkCommand = async (command: SendActicationLinkCommand): Promise<any> => {

    return await userRegistrationAggregateHandler(
        findEventStore(),
        undefined,
        (state: UserRegistrationAggregate) => _handleUserRegistrationAggregate(command, state))
}

