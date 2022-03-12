/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-18 16:33:06 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 01:03:48
 */

import * as Core from "event-sourced-cqrs-core";

export const EventReducersDefinitionsRepository = (repository: { [key: string]: Core.Events.Reducers.Definitions.Definition }): Core.Events.Reducers.Definitions.Repository => {
	return ({
		get: (id: Core.Types.UUID) => Promise.resolve(repository[id] === undefined ? null : repository[id]),
		query: (command: Core.Events.Event) => Promise.resolve(Object.values(repository).filter((definition) => definition.triggeringEventId === command.id)),
	})
}

export const EventReducersDefinitionsRepositoryInstance = EventReducersDefinitionsRepository({});