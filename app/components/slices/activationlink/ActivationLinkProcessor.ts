import {Processor} from '@/app/core/types';
import {initialState, loadFromStream, Registration} from '@/app/components/slices/registeredusers/RegisteredUsersReadModel';
import {
    handleSendActicationLinkCommand,
    SendActicationLinkCommand
} from '@/app/components/slices/activationlink/SendActicationLinkCommand';
import {v4} from "uuid"


interface ActivationLinkProcessor extends Processor {
}

export const ActivationLinkProcessor: ActivationLinkProcessor = {

    process: async () => {
        let readModel = await loadFromStream("UserRegistrationAggregate", initialState())
        readModel?.registrations.forEach((it: Registration) => {

            var command: SendActicationLinkCommand = {
                type: "SendActicationLinkCommand",
                data: {
                    email: it.email,
                    Name: it.Name,
                    activationLink: v4()
                }
            }
            handleSendActicationLinkCommand(command)
        })


    }
}
