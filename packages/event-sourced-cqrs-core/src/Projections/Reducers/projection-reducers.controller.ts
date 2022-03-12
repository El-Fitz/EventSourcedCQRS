/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 16:03:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 18:03:23
 */

import * as Projections from "..";
import * as Events from "../../Events"

export interface ProjectionsReducersControllerInterface {
	createDefinition: (aggregateReducerDefinition: Projections.Reducers.Definitions.Definition) => Promise<Projections.Reducers.Definitions.Definition>;
	query: (event: Events.Event) => Promise<{ definition: Projections.Reducers.Definitions.Definition, reducer: Projections.Reducers.Reducer }[]>;
}

export const ProjectionsReducersController =
(reducersDefinitionsService: Projections.Reducers.Definitions.ServiceInterface) =>
(reducersService: Projections.Reducers.ServiceInterface): ProjectionsReducersControllerInterface => ({
	createDefinition: (aggregateReducerDefinition: Projections.Reducers.Definitions.Definition) => 
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