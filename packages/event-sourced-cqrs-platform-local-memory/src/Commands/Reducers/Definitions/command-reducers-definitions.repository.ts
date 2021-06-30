/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:20:38 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 01:05:37
 */

import * as Core from "event-sourced-cqrs-core";

export const CommandReducersDefinitionsRepository = (): Core.Commands.Reducers.Definitions.Repository => {

	let repository: { [key: string]: Core.Commands.Reducers.Definitions.Definition } =  { };

	return ({
		create: (commandReducerDefinition: Core.Commands.Reducers.Definitions.Definition) => {
			repository[commandReducerDefinition.id] = commandReducerDefinition;
			return Promise.resolve(commandReducerDefinition);
		},
		get: (id: Core.Types.UUID) => Promise.resolve(repository[id] === undefined ? null : repository[id]),
		query: (command: Core.Commands.Command) => Promise.resolve(Object.values(repository).filter((definition) => definition.triggeringCommandId === command.id)),
		delete: (commandReducerDefinition: Core.Commands.Reducers.Definitions.Definition) => {
			delete repository[commandReducerDefinition.id]
			return Promise.resolve();
		}
	})
}

export const CommandReducersDefinitionsRepositoryInstance = CommandReducersDefinitionsRepository();