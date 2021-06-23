/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-12 22:35:51 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 02:19:07
 */

import Domain from "./domain";
import * as EventReducersDefinitionsRepository from "./event-reducers-definitions.repository";
import * as EventReducersDefinitionsService from "./event-reducers-definitions.service";
import * as EventsRepository from "./events.repository";
import * as EventsService from "./events.service";
import * as EventsMessageBus from "./events.message-bus";
import * as EventsController from "./events.controller";
import * as EventsReducer from "./events.reducer";

export namespace Events {
	export import Event = Domain.Event;
	export import Controller = EventsController.EventsController;
	export import MessageBus = EventsMessageBus.EventsMessageBus;
	export import Reducer = EventsReducer.EventsReducer;
	export import Repository = EventsRepository.EventsRepository;
	export import ServiceInterface = EventsService.EventsServiceInterface;
	export import Service = EventsService.EventsService;

	export namespace Reducers {

		export import Reducer = Domain.Reducer;

		export namespace Definitions {
			export import Definition = Domain.ReducerDefinition;
			export import Repository = EventReducersDefinitionsRepository.EventReducersDefinitionsRepository;
			export import ServiceInterface = EventReducersDefinitionsService.EventReducersDefinitionsServiceInterface;
			export import Service = EventReducersDefinitionsService.EventReducersDefinitionsService;
		}
	}
}

export default Events;