import {Command, CommandHandler} from '@event-driven-io/emmett';
import {UserRegistrationAggregateEvents} from "@/app/components/events/UserRegistrationAggregate/UserRegistrationAggregateEvents"
import {UserRegistrationAggregate} from "@/app/components/domain/UserRegistrationAggregate"
import {findEventStore} from '@/app/core/infrastructure/inmemoryEventstore';
import {UserActivatedEvent} from "@/app/components/events/UserRegistrationAggregate/UserActivatedEvent"
import {evolve as userRegistrationAggregateEvolve, initialState as userRegistrationAggregateInitialState, mapToStreamId as userRegistrationAggregateMapToStreamId} from "@/app/components/domain/UserRegistrationAggregate"

export type ActivateAccountCommand = Command<
    'ActivateAccountCommand',
    {
		email:string
    }
>;

const _handleUserRegistrationAggregate = (command: ActivateAccountCommand, state: UserRegistrationAggregate ):UserRegistrationAggregateEvents[] => {
                return [{
                type: 'UserActivatedEvent',
                data: {
                    			email:command.data.email
                }
            }]
                }
                    

const userRegistrationAggregateHandler = CommandHandler(userRegistrationAggregateEvolve, userRegistrationAggregateInitialState, userRegistrationAggregateMapToStreamId)


        export const handleActivateAccountCommand = async (command:ActivateAccountCommand): Promise<any> => {
        
            return await userRegistrationAggregateHandler(
                                findEventStore(),
                                command.data.aggregateId,
                                (state:UserRegistrationAggregate) => _handleUserRegistrationAggregate(command, state))
        }
        
