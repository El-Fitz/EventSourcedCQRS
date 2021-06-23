/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-12 22:27:29 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 20:56:02
 */

import Domain from "./domain";
import * as CommandReducersDefinitionsRepository from "./command-reducers-definitions.repository";
import * as CommandReducersDefinitionsService from "./command-reducers-definitions.service";
import * as CommandsRepository from "./commands.repository";
import * as CommandsMessageBus from "./commands.message-bus";
import * as CommandsService from "./commands.service";
import * as CommandsController from "./commands.controller";
import * as CommandsReducer from "./commands.reducer";

export namespace Commands {
	export import Command = Domain.Command;
	export import Repository = CommandsRepository.CommandsRepository;
	export import ServiceInterface = CommandsService.CommandsServiceInterface;
	export import Service = CommandsService.CommandsService;
	export import MessageBus = CommandsMessageBus.CommandsMessageBus;
	export import Controller = CommandsController.CommandsController;
	export import Reducer = CommandsReducer.CommandsReducer;

	export namespace Reducers {

		export import Reducer = Domain.Reducer;

		export namespace Definitions {
			export import Definition = Domain.ReducerDefinition;
			export import Repository = CommandReducersDefinitionsRepository.CommandReducersDefinitionsRepository;
			export import ServiceInterface = CommandReducersDefinitionsService.CommandReducersDefinitionsServiceInterface;
			export import Service = CommandReducersDefinitionsService.CommandReducersDefinitionsService;
		}
	}
}

export default Commands;