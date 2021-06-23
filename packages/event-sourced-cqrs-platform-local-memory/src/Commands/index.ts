/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-18 16:53:42 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-18 16:54:04
 */

import * as CommandReducersDefinitionsRepository from "./command-reducers-definitions.repository";
import * as CommandReducersDefinitionsService from "./command-reducers-definitions.service";
import * as CommandsRepository from "./commands.repository";
import * as CommandsMessageBus from "./commands.message-bus";
import * as CommandsService from "./commands.service";

export namespace Commands {
	export import Repository = CommandsRepository.CommandsRepository;
	export import Service = CommandsService.CommandsService;
	export import MessageBus = CommandsMessageBus.CommandsMessageBus;

	export namespace Reducers {

		export namespace Definitions {
			export import Repository = CommandReducersDefinitionsRepository.CommandReducersDefinitionsRepository;
			export import Service = CommandReducersDefinitionsService.CommandReducersDefinitionsService;
		}
	}
}

export default Commands;