/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:42:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 18:38:09
 */

import { Core } from "event-sourced-cqrs-core";

export const AggregatesReducersRepository = (repository: { [key: string]: Core.Aggregates.Reducers.Reducer }): Core.Aggregates.Reducers.Repository => {
	return ({
		create: (id: Core.Types.UUID, reducer: Core.Aggregates.Reducers.Reducer) => {
			repository[id] = reducer;
			return Promise.resolve(reducer);
		},
		get: (definition: Core.Aggregates.Reducers.Definitions.Definition) => repository[definition.reducerId] === undefined ? Promise.reject() : Promise.resolve(repository[definition.id]),
	})
}

export const AggregatesReducersRepositoryInstance = AggregatesReducersRepository({});