/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:20:38 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:26:39
 */

import { Core } from "event-sourced-cqrs-core";

export const CommandReducersDefinitionsRepository = (repository: { [key: string]: Core.Commands.Reducers.Definitions.Definition }): Core.Commands.Reducers.Definitions.Repository => {
	return ({
		create: (commandReducerDefinition: Core.Commands.Reducers.Definitions.Definition) => {
			repository[commandReducerDefinition.id] = commandReducerDefinition;
			return Promise.resolve(commandReducerDefinition);
		},
		get: (id: Core.Types.UUID) => Promise.resolve(repository[id] === undefined ? null : repository[id]),
		query: (command: Core.Commands.Command) => Promise.resolve(Object.values(repository).filter((definition) => definition.triggeringCommandId === command.id)),
		delete: (id: Core.Types.UUID) => {
			delete repository[id];
			return Promise.resolve();
		}
	})
}

export const CommandReducersDefinitionsRepositoryInstance = CommandReducersDefinitionsRepository({});