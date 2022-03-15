/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:36 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:54:55
 */

import * as Events from ".";

export interface EventsMessageBus {
	emit: (event: Events.Event) => Promise<void>;
	emitMultiple: (events: Events.Event[]) => Promise<void>;
}