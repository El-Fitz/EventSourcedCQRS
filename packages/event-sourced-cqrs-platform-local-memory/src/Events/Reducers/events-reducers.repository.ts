/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:40:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 18:38:35
 */

import { Core } from "event-sourced-cqrs-core";

export const EventsReducersRepository = (repository: { [key: string]: Core.Events.Reducers.Reducer }): Core.Events.Reducers.Repository => {
	return ({
		create: (id: Core.Types.UUID, reducer: Core.Events.Reducers.Reducer) => {
			repository[id] = reducer;
			return Promise.resolve(reducer);
		},
		get: (definition: Core.Events.Reducers.Definitions.Definition) => repository[definition.reducerId] === undefined ? Promise.reject() : Promise.resolve(repository[definition.id]),
	})
}

export const EventsReducersRepositoryInstance = EventsReducersRepository({});