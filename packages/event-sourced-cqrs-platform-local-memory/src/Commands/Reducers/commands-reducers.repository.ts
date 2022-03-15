/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:40:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 18:38:24
 */

import { Core } from "event-sourced-cqrs-core";

export const CommandsReducersRepository = (repository: { [key: string]: Core.Commands.Reducers.Reducer }): Core.Commands.Reducers.Repository => {
	return ({
		create: (id: Core.Types.UUID, reducer: Core.Commands.Reducers.Reducer) => {
			repository[id] = reducer;
			return Promise.resolve(reducer);
		},
		get: (definition: Core.Commands.Reducers.Definitions.Definition) => repository[definition.reducerId] === undefined ? Promise.reject() : Promise.resolve(repository[definition.id]),
	})
}

export const CommandsReducersRepositoryInstance = CommandsReducersRepository({});