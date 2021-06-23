/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-18 16:46:05 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-18 16:47:48
 */

import Core from "event-sourced-cqrs-core";

export const EventsRepository = (): Core.Events.Repository => {
	let repository: { [key: string]: Core.Events.Event } = { };

	return {
		create: (event: Core.Events.Event) => {
			repository[event.id] = event;
			return Promise.resolve(event);
		},
		get: (eventId: Core.Types.UUID) => {
			const event = repository[eventId];
			if (event === undefined) {
				return Promise.resolve(null);
			}
			return Promise.resolve(event);
		}
	}
}