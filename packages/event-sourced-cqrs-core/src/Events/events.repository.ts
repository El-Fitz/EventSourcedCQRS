/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:42 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-18 16:47:38
 */

import Types from "../types";
import Events from "./";

export interface EventsRepository {
	create: (event: Events.Event) => Promise<Events.Event>;
	get: (eventId: Types.UUID) => Promise<Events.Event | null>;
	// update: (event: Events.Event) => Promise<Events.Event>;
	// delete: (event: Events.Event) => Promise<void>;
}