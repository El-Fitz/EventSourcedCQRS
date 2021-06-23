/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 01:04:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-19 18:21:21
 */

import Core from "event-sourced-cqrs-core";

export const AggregateReducersDefinitionsRepository = (): Core.Aggregates.Reducers.Definitions.Repository => {

	let repository: { [key: string]: Core.Aggregates.Reducers.Definitions.Definition } =  { };

	return ({
		create: (aggregateReducerDefinition: Core.Aggregates.Reducers.Definitions.Definition) => {
			repository[aggregateReducerDefinition.id] = aggregateReducerDefinition;
			return Promise.resolve(aggregateReducerDefinition);
		},
		get: (id: Core.Types.UUID) => Promise.resolve(repository[id] === undefined ? [] : [repository[id]]),
		query: (event: Core.Events.Event) => Promise.resolve(Object.values(repository).filter((definition) => definition.triggeringEventId === event.id)),
		delete: (aggregateReducerDefinition: Core.Aggregates.Reducers.Definitions.Definition) => {
			delete repository[aggregateReducerDefinition.id]
			return Promise.resolve();
		}
	})
}

export const AggregateReducersDefinitionsRepositoryInstance = AggregateReducersDefinitionsRepository();