/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:42:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 15:24:05
 */

import { Core } from "event-sourced-cqrs-core";

export const AggregatesReducersRepository = (repository: { [key: string]: Core.Aggregates.Reducers.Reducer }): Core.Aggregates.Reducers.Repository => {
	return ({
		create: (id: Core.Types.UUID, reducer: Core.Aggregates.Reducers.Reducer) => {
			repository[id] = reducer;
			return Promise.resolve(reducer);
		},
		get: ({ reducerId }: Core.Aggregates.Reducers.Definitions.Definition) => repository[reducerId] === undefined ? Promise.reject(new Error(`Reducer not found for id: ${reducerId}`)) : Promise.resolve(repository[reducerId]),
	})
}

export const AggregatesReducersRepositoryInstance = AggregatesReducersRepository({});