/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-18 16:33:06 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:26:43
 */

import { Core } from "event-sourced-cqrs-core";

export const EventReducersDefinitionsRepository = (repository: { [key: string]: Core.Events.Reducers.Definitions.Definition }): Core.Events.Reducers.Definitions.Repository => {
	return ({
		create: (eventReducerDefinition: Core.Events.Reducers.Definitions.Definition) => {
			repository[eventReducerDefinition.id] = eventReducerDefinition;
			return Promise.resolve(eventReducerDefinition);
		},
		get: (id: Core.Types.UUID) => Promise.resolve(repository[id] === undefined ? null : repository[id]),
		query: (command: Core.Events.Event) => Promise.resolve(Object.values(repository).filter((definition) => definition.triggeringEventId === command.id)),
		delete: (id: Core.Types.UUID) => {
			delete repository[id];
			return Promise.resolve();
		}
	})
}

export const EventReducersDefinitionsRepositoryInstance = EventReducersDefinitionsRepository({});