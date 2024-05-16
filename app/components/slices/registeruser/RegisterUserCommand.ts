import {Command, CommandHandler} from '@event-driven-io/emmett';
import {UserRegistrationAggregateEvents} from "@/app/components/events/UserRegistrationAggregate/UserRegistrationAggregateEvents"
import {UserRegistrationAggregate} from "@/app/components/domain/UserRegistrationAggregate"
import {findEventStore} from '@/app/core/infrastructure/inmemoryEventstore';
import {UserRegisteredEvent} from "@/app/components/events/UserRegistrationAggregate/UserRegisteredEvent"
import {evolve as userRegistrationAggregateEvolve, initialState as userRegistrationAggregateInitialState, mapToStreamId as userRegistrationAggregateMapToStreamId} from "@/app/components/domain/UserRegistrationAggregate"

export type RegisterUserCommand = Command<
    'RegisterUserCommand',
    {
		Name:string
		email:string
    }
>;

const _handleUserRegistrationAggregate = (command: RegisterUserCommand, state: UserRegistrationAggregate ):UserRegistrationAggregateEvents[] => {
                return [{
                type: 'UserRegisteredEvent',
                data: {
                    			Name:command.data.Name,
			email:command.data.email
                }
            }]
                }
                    

const userRegistrationAggregateHandler = CommandHandler(userRegistrationAggregateEvolve, userRegistrationAggregateInitialState, userRegistrationAggregateMapToStreamId)


        export const handleRegisterUserCommand = async (command:RegisterUserCommand): Promise<any> => {
        
            return await userRegistrationAggregateHandler(
                                findEventStore(),
                                command.data.aggregateId,
                                (state:UserRegistrationAggregate) => _handleUserRegistrationAggregate(command, state))
        }
        
