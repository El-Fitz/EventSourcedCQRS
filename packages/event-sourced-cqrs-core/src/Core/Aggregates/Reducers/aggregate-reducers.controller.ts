/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 16:03:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 18:02:57
 */

import * as Aggregates from "..";
import * as Events from "../../Events"

export interface AggregatesReducersControllerInterface {
	createDefinition: (aggregateReducerDefinition: Aggregates.Reducers.Definitions.Definition) => Promise<Aggregates.Reducers.Definitions.Definition>;
	query: (event: Events.Event) => Promise<{ definition: Aggregates.Reducers.Definitions.Definition, reducer: Aggregates.Reducers.Reducer }[]>;
}

export const AggregatesReducersController =
(reducersDefinitionsService: Aggregates.Reducers.Definitions.ServiceInterface) =>
(reducersService: Aggregates.Reducers.ServiceInterface): AggregatesReducersControllerInterface => ({
	createDefinition: (aggregateReducerDefinition: Aggregates.Reducers.Definitions.Definition) => 
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