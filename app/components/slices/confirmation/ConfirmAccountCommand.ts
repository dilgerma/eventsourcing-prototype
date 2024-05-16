import {Command, CommandHandler} from '@event-driven-io/emmett';
import {UserRegistrationAggregateEvents} from "@/app/components/events/UserRegistrationAggregate/UserRegistrationAggregateEvents"
import {UserRegistrationAggregate} from "@/app/components/domain/UserRegistrationAggregate"
import {findEventStore} from '@/app/core/infrastructure/inmemoryEventstore';
import {AccountConfirmedEvent} from "@/app/components/events/UserRegistrationAggregate/AccountConfirmedEvent"
import {evolve as userRegistrationAggregateEvolve, initialState as userRegistrationAggregateInitialState, mapToStreamId as userRegistrationAggregateMapToStreamId} from "@/app/components/domain/UserRegistrationAggregate"

export type ConfirmAccountCommand = Command<
    'ConfirmAccountCommand',
    {
		email:string
    }
>;

const _handleUserRegistrationAggregate = (command: ConfirmAccountCommand, state: UserRegistrationAggregate ):UserRegistrationAggregateEvents[] => {
                return [{
                type: 'AccountConfirmedEvent',
                data: {
                    			email:command.data.email
                }
            }]
                }
                    

const userRegistrationAggregateHandler = CommandHandler(userRegistrationAggregateEvolve, userRegistrationAggregateInitialState, userRegistrationAggregateMapToStreamId)


        export const handleConfirmAccountCommand = async (command:ConfirmAccountCommand): Promise<any> => {
        
            return await userRegistrationAggregateHandler(
                                findEventStore(),
                                command.data.aggregateId,
                                (state:UserRegistrationAggregate) => _handleUserRegistrationAggregate(command, state))
        }
        
