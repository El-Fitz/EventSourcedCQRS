/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:42:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 18:49:40
 */

import { Core } from "event-sourced-cqrs-core";

export const ProjectionsReducersRepository = (repository: { [key: string]: Core.Projections.Reducers.Reducer }): Core.Projections.Reducers.Repository => {
	return ({
		create: (id: Core.Types.UUID, reducer: Core.Projections.Reducers.Reducer) => {
			repository[id] = reducer;
			return Promise.resolve(reducer);
		},
		get: (definition: Core.Projections.Reducers.Definitions.Definition) => repository[definition.reducerId] === undefined ? Promise.reject() : Promise.resolve(repository[definition.id]),
	})
}

export const ProjectionsReducersRepositoryInstance = ProjectionsReducersRepository({});