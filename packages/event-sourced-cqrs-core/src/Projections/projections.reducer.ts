/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 19:07:34 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-29 22:51:30
 */

import * as Aggregates from "../Aggregates";
import * as Events from "../Events";
import * as Projections from ".";

export const ProjectionsReducer = (event: Events.Event) =>
	(aggregatesServicesService: Aggregates.ServicesServiceInterface) =>
		(projectionReducersDefinitionsService: Projections.Reducers.Definitions.ServiceInterface) =>
				projectionReducersDefinitionsService
				.query(event)
				.then((projectionReducersDefinitions) =>
					Promise.all(
						[... new Set(
							projectionReducersDefinitions
								.flatMap((projectionBuildersDefinitions) => projectionBuildersDefinitions.requiredAggregates)
						)]
						.map((requiredAggregate) => aggregatesServicesService.get(requiredAggregate.repositoryId).then((aggregatesService) => aggregatesService === null ? Promise.resolve(null) : aggregatesService.get(requiredAggregate.id)))
					).then((aggregates) => {
						if (aggregates.includes(null)) {
							return Promise.reject("Failed resolving some aggregates")
						}
						return aggregates as Aggregates.Aggregate[]
					}).then((aggregates) => 
						Promise.all(
							projectionReducersDefinitions.map((projectionReducerDefinition) =>
								projectionReducerDefinition
									.reducer()
									.then((projectionBuilderReducer) => projectionBuilderReducer(event)(aggregates))
						))
					).then((res) => res)
				).then((projectionsPromises) => projectionsPromises.flatMap((projectionPromise) => projectionPromise));
