/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:42:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 16:51:01
 */

import * as Core from "event-sourced-cqrs-core";

export const AggregatesReducersRepository = (repository: { [key: string]: Core.Aggregates.Reducers.Reducer }): Core.Aggregates.Reducers.Repository => {
	return ({
		get: (definition: Core.Aggregates.Reducers.Definitions.Definition) => repository[definition.id] === undefined ? Promise.reject() : Promise.resolve(repository[definition.id]),
	})
}

export const AggregatesReducersRepositoryInstance = AggregatesReducersRepository({});