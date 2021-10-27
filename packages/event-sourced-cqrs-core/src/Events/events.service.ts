/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:45 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-27 00:42:52
 */

import * as Types from "../Types"
import * as Events from "./"

export interface EventsServiceInterface {
	create: (event: Events.Event) => Promise<Events.Event>;
	get: (eventId: Types.UUID, eventInstanceId: Types.UUID) => Promise<Events.Event | null>;
	list: () => Promise<Events.Event[]>;
	// update: (event: Events.Event) => Promise<Events.Event>;
	// delete: (event: Events.Event) => Promise<void>;
}

export const EventsService = (repository: Events.Repository): EventsServiceInterface => ({
	create: (event: Events.Event) => repository.create(event),
	get: (eventId: Types.UUID, eventInstanceId: Types.UUID) => repository.get(eventId, eventInstanceId),
	list: () => repository.list(),
	// update: (event: Events.Event) => repository.update(event),
	// delete: (event: Events.Event) => repository.delete(event),
})