/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:42:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 11:10:48
 */

import { Core } from "event-sourced-cqrs-core";

export const ProjectionsReducersRepository = (repository: { [key: string]: Core.Projections.Reducers.Reducer }): Core.Projections.Reducers.Repository => {
	return ({
		create: (id: Core.Types.UUID, reducer: Core.Projections.Reducers.Reducer) => {
			repository[id] = reducer;
			return Promise.resolve(reducer);
		},
		get: ({ reducerId }: Core.Projections.Reducers.Definitions.Definition) => repository[reducerId] === undefined ? Promise.reject(new Error(`Reducer not found for id: ${reducerId}`)) : Promise.resolve(repository[reducerId]),
	})
}

export const ProjectionsReducersRepositoryInstance = ProjectionsReducersRepository({});