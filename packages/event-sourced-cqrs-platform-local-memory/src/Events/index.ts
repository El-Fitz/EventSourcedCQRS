/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-18 16:54:29 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-18 16:54:51
 */

import * as EventReducersDefinitionsRepository from "./event-reducers-definitions.repository";
import * as EventReducersDefinitionsService from "./event-reducers-definitions.service";
import * as EventsRepository from "./events.repository";
import * as EventsService from "./events.service";
import * as EventsMessageBus from "./events.message-bus";

export namespace Events {
	export import MessageBus = EventsMessageBus.EventsMessageBus;
	export import Repository = EventsRepository.EventsRepository;
	export import Service = EventsService.EventsService;

	export namespace Reducers {

		export namespace Definitions {
			export import Repository = EventReducersDefinitionsRepository.EventReducersDefinitionsRepository;
			export import Service = EventReducersDefinitionsService.EventReducersDefinitionsService;
		}
	}
}

export default Events;