/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:40:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 14:08:33
 */

import { Core } from "event-sourced-cqrs-core";

export const CommandsReducersRepository = (repository: { [key: string]: Core.Commands.Reducers.Reducer }): Core.Commands.Reducers.Repository => {
	return ({
		create: (id: Core.Types.UUID, reducer: Core.Commands.Reducers.Reducer) => {
			repository[id] = reducer;
			return Promise.resolve(reducer);
		},
		get: ({ reducerId }: Core.Commands.Reducers.Definitions.Definition) => repository[reducerId] === undefined ? Promise.reject(new Error(`Reducer not found for id: ${reducerId}`)) : Promise.resolve(repository[reducerId]),
	})
}

export const CommandsReducersRepositoryInstance = CommandsReducersRepository({});