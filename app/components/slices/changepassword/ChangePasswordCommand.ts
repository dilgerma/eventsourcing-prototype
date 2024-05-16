import {Command, CommandHandler} from '@event-driven-io/emmett';
import {
    UserRegistrationAggregateEvents
} from "@/app/components/events/UserRegistrationAggregate/UserRegistrationAggregateEvents"
import {UserRegistrationAggregate} from "@/app/components/domain/UserRegistrationAggregate"
import {findEventStore} from '@/app/core/infrastructure/inmemoryEventstore';
import {PasswordChangedEvent} from "@/app/components/events/UserRegistrationAggregate/PasswordChangedEvent"
import {
    evolve as userRegistrationAggregateEvolve,
    initialState as userRegistrationAggregateInitialState,
    mapToStreamId as userRegistrationAggregateMapToStreamId
} from "@/app/components/domain/UserRegistrationAggregate"

export type ChangePasswordCommand = Command<
    'ChangePasswordCommand',
    {
        email: string
        password: string
    }
>;

const _handleUserRegistrationAggregate = (command: ChangePasswordCommand, state: UserRegistrationAggregate): UserRegistrationAggregateEvents[] => {
    return [{
        type: 'PasswordChangedEvent',
        data: {
            email: command.data.email,
            password: command.data.password
        }
    }]
}


const userRegistrationAggregateHandler = CommandHandler(userRegistrationAggregateEvolve, userRegistrationAggregateInitialState, userRegistrationAggregateMapToStreamId)


export const handleChangePasswordCommand = async (command: ChangePasswordCommand): Promise<any> => {

    return await userRegistrationAggregateHandler(
        findEventStore(),
        command.data.aggregateId,
        (state: UserRegistrationAggregate) => _handleUserRegistrationAggregate(command, state))
}

