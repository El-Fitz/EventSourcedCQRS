/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:39 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:22:00
 */

import Aggregates from "../Aggregates";
import Events from "./";

export const EventsReducer = (event: Events.Event) => 
	(eventReducersDefinitionsService: Events.Reducers.Definitions.ServiceInterface) =>
		(aggregatesServicesService: Aggregates.ServicesServiceInterface) =>
			eventReducersDefinitionsService
				.query(event)
				.then((eventReducersDefinitions) => 
				Promise.all(
					[... new Set(
						eventReducersDefinitions
							.flatMap((eventReducerDefinition) => eventReducerDefinition.requiredAggregates)
					)]
					.map((requiredAggregate) =>
						aggregatesServicesService.get(requiredAggregate.repositoryId)
							.then((aggregateService) => {
								if (aggregateService === null) {
									return Promise.reject("Failed Resolving Aggregate Service")
								}
								return aggregateService
							})
							.then((aggregatesService) => aggregatesService.get(requiredAggregate.id))
					)
				).then((aggregates) =>
						Promise.all(
							eventReducersDefinitions.map((eventReducerDefinition) =>
								eventReducerDefinition
									.reducer()
									.then((reducer) => reducer(event)(aggregates))
						))
					)
				)
				.then((eventPromises) => eventPromises.flatMap((eventPromise) => eventPromise));
