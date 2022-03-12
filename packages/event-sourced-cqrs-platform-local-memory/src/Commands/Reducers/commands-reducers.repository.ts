/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:40:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:59:20
 */

import * as Core from "event-sourced-cqrs-core";

export const CommandsReducersRepository = (repository: { [key: string]: Core.Commands.Reducers.Reducer }): Core.Commands.Reducers.Repository => {
	return ({
		get: (definition: Core.Commands.Reducers.Definitions.Definition) => repository[definition.id] === undefined ? Promise.reject() : Promise.resolve(repository[definition.id]),
	})
}

export const CommandsReducersRepositoryInstance = CommandsReducersRepository({});