/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:40:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 15:07:30
 */

import { Core } from "event-sourced-cqrs-core";

export const EventsReducersRepository = (repository: { [key: string]: Core.Events.Reducers.Reducer }): Core.Events.Reducers.Repository => {
	return ({
		create: (id: Core.Types.UUID, reducer: Core.Events.Reducers.Reducer) => {
			repository[id] = reducer;
			return Promise.resolve(reducer);
		},
		get: ({ reducerId }: Core.Events.Reducers.Definitions.Definition) => repository[reducerId] === undefined ? Promise.reject(new Error(`Reducer not found for id: ${reducerId}`)) : Promise.resolve(repository[reducerId]),
	})
}

export const EventsReducersRepositoryInstance = EventsReducersRepository({});