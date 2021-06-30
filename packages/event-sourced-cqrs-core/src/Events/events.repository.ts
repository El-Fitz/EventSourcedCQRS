/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:42 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-27 00:42:35
 */

import * as Types from "../types";
import * as Events from "./";

export interface EventsRepository {
	create: (event: Events.Event) => Promise<Events.Event>;
	get: (eventId: Types.UUID, eventInstanceId: Types.UUID) => Promise<Events.Event | null>;
	list: () => Promise<Events.Event[]>;
	// update: (event: Events.Event) => Promise<Events.Event>;
	// delete: (event: Events.Event) => Promise<void>;
}