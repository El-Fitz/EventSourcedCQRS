/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:20:38 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 01:03:38
 */

import * as Core from "event-sourced-cqrs-core";

export const CommandReducersDefinitionsRepository = (repository: { [key: string]: Core.Commands.Reducers.Definitions.Definition }): Core.Commands.Reducers.Definitions.Repository => {
	return ({
		get: (id: Core.Types.UUID) => Promise.resolve(repository[id] === undefined ? null : repository[id]),
		query: (command: Core.Commands.Command) => Promise.resolve(Object.values(repository).filter((definition) => definition.triggeringCommandId === command.id)),
	})
}

export const CommandReducersDefinitionsRepositoryInstance = CommandReducersDefinitionsRepository({});