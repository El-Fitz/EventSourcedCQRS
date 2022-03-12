/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:45:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:48:06
 */

import * as Events from "../";

export interface EventsReducersControllerInterface {
	createDefinition: (aggregateReducerDefinition: Events.Reducers.Definitions.Definition) => Promise<Events.Reducers.Definitions.Definition>;
	query: (event: Events.Event) => Promise<{ definition: Events.Reducers.Definitions.Definition, reducer: Events.Reducers.Reducer }[]>;
}

export const EventsReducersController =
(reducersDefinitionsService: Events.Reducers.Definitions.ServiceInterface) =>
(reducersService: Events.Reducers.ServiceInterface): EventsReducersControllerInterface => ({
	createDefinition: (aggregateReducerDefinition: Events.Reducers.Definitions.Definition) => 
		reducersService
			.get(aggregateReducerDefinition)
			.catch(() => Promise.reject("Could not retrieve reducer for definition while creating definition"))
			.then(() => reducersDefinitionsService.create(aggregateReducerDefinition)),
	query: (event: Events.Event) =>
		reducersDefinitionsService
			.query(event)
			.then((definitions) => Promise.all(
				definitions.map((definition) =>
					reducersService
						.get(definition)
						.then((reducer) => ({ definition, reducer }))
				)
			))
})