/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 21:11:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 21:11:34
 */

import Core from "event-sourced-cqrs-core";
import { v4 as uuid } from "uuid";

interface LocalMemoryEventsMessageBus extends Core.Events.MessageBus {
	subscribe: (subscriptionCallback: (command: Core.Events.Event) => Promise<void>) => Core.Types.UUID;
	unsubscribe: (subscriberId: Core.Types.UUID) => void;
}

export const EventsMessageBus = (): LocalMemoryEventsMessageBus => {
	let subscribers: { [key: string]: (command: Core.Events.Event) => Promise<void> } = {};

	return ({
		subscribe: (subscriptionCallback: (command: Core.Events.Event) => Promise<void>) => {
			const subscriberId = uuid();
			subscribers[subscriberId] = subscriptionCallback;
			return subscriberId;
		},
		unsubscribe: (subscriberId: Core.Types.UUID) => {
			delete subscribers[subscriberId];
			return
		},
		emit: (command: Core.Events.Event) => {
			return Promise.all(Object.values(subscribers).map((subscriber) => subscriber(command))).then(() => { });
		},
		emitMultiple: (commands: Core.Events.Event[]) => {
			return Promise.all(
				commands.map((command) => Promise.all(Object.values(subscribers).map((subscriber) => subscriber(command))))
			).then(() => { });
		}
	})
}