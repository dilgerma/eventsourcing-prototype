import {Processor} from '@/app/core/types';
import {initialState, loadFromStream, Activation} from '@/app/components/slices/activations/ActivationsReadModel';
import {v4} from "uuid"
import {
    ActivateAccountCommand,
    handleActivateAccountCommand
} from '@/app/components/slices/activateaccounts/ActivateAccountCommand';


interface ActivationLinkProcessor extends Processor {
}

export const ActivateAccountProcessor: ActivationLinkProcessor = {

    process: async () => {
        let readModel = await loadFromStream("UserRegistrationAggregate", initialState())

        readModel?.activations.forEach((it: Activation) => {

            var command: ActivateAccountCommand = {
                data: {
                    email: it.email,
                }
            }
            handleActivateAccountCommand(command)
        })


    }
}
