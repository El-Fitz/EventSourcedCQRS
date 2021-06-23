/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 19:07:34 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:19:45
 */

import Events from "../Events"
import Aggregates from "./";

export const AggregatesReducer = (event: Events.Event) =>
	(aggregatesServicesService: Aggregates.ServicesServiceInterface) =>
		(aggregateReducersDefinitionsService: Aggregates.Reducers.Definitions.ServiceInterface) =>
				aggregateReducersDefinitionsService
				.query(event)
				.then((aggregateReducersDefinitions) =>
					Promise.all(
						[... new Set(
							aggregateReducersDefinitions
								.flatMap((aggregateBuildersDefinitions) => aggregateBuildersDefinitions.requiredAggregates)
						)]
						.map((requiredAggregate) => aggregatesServicesService.get(requiredAggregate.repositoryId).then((aggregatesService) => aggregatesService === null ? Promise.resolve(null) : aggregatesService.get(requiredAggregate.id)))
					).then((aggregates) => {
						if (aggregates.includes(null)) {
							return Promise.reject("Failed resolving some aggregates")
						}
						return aggregates as Aggregates.Aggregate[]
					}).then((aggregates) => 
						Promise.all(
							aggregateReducersDefinitions.map((aggregateReducerDefinition) =>
								aggregateReducerDefinition
									.reducer()
									.then((aggregateBuilderReducer) => aggregateBuilderReducer(event)(aggregates))
						))
					).then((res) => res)
				).then((aggregatesPromises) => aggregatesPromises.flatMap((aggregatePromise) => aggregatePromise));
