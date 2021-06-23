/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-18 16:33:06 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-18 16:33:27
 */

import Core from "event-sourced-cqrs-core";

export const EventReducersDefinitionsRepository = (): Core.Events.Reducers.Definitions.Repository => {

	let repository: { [key: string]: Core.Events.Reducers.Definitions.Definition } =  { };

	return ({
		create: (aggregateReducerDefinition: Core.Events.Reducers.Definitions.Definition) => {
			repository[aggregateReducerDefinition.id] = aggregateReducerDefinition;
			return Promise.resolve(aggregateReducerDefinition);
		},
		get: (id: Core.Types.UUID) => Promise.resolve([repository[id]]),
		query: (command: Core.Events.Event) => Promise.resolve(Object.values(repository).filter((definition) => definition.triggeringEventId === command.id)),
		delete: (aggregateReducerDefinition: Core.Events.Reducers.Definitions.Definition) => {
			delete repository[aggregateReducerDefinition.id]
			return Promise.resolve();
		}
	})
}

export const EventReducersDefinitionsRepositoryInstance = EventReducersDefinitionsRepository();