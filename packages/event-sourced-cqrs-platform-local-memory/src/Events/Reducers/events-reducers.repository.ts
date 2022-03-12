/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:40:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:59:45
 */

import * as Core from "event-sourced-cqrs-core";

export const EventsReducersRepository = (repository: { [key: string]: Core.Events.Reducers.Reducer }): Core.Events.Reducers.Repository => {
	return ({
		get: (definition: Core.Events.Reducers.Definitions.Definition) => repository[definition.id] === undefined ? Promise.reject() : Promise.resolve(repository[definition.id]),
	})
}

export const EventsReducersRepositoryInstance = EventsReducersRepository({});