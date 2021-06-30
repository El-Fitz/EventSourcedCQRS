/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:24:09 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 17:53:45
 */

import * as Core from "event-sourced-cqrs-core";
import { v4 as uuid } from "uuid";

interface LocalMemoryCommandsMessageBus extends Core.Commands.MessageBus {
	subscribe: (subscriptionCallback: (command: Core.Commands.Command) => Promise<void>) => Core.Types.UUID;
	unsubscribe: (subscriberId: Core.Types.UUID) => void;
}

export const CommandsMessageBus = (): LocalMemoryCommandsMessageBus => {
	let subscribers: { [key: string]: (command: Core.Commands.Command) => Promise<void> } = {};

	return ({
		subscribe: (subscriptionCallback: (command: Core.Commands.Command) => Promise<void>) => {
			const subscriberId = uuid();
			subscribers[subscriberId] = subscriptionCallback;
			return subscriberId;
		},
		unsubscribe: (subscriberId: Core.Types.UUID) => {
			delete subscribers[subscriberId];
			return
		},
		emit: (command: Core.Commands.Command) => {
			return Promise.all(Object.values(subscribers).map((subscriber) => subscriber(command))).then(() => { });
		},
		emitMultiple: (commands: Core.Commands.Command[]) => {
			return Promise.all(
				commands.map((command) => Promise.all(Object.values(subscribers).map((subscriber) => subscriber(command))))
			).then(() => { });
		}
	})
}