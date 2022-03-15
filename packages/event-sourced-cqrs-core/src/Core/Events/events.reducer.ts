/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:39 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:51:24
 */

import * as Aggregates from "../Aggregates";
import * as Events from ".";

export const EventsReducer = (event: Events.Event) => 
	(eventReducersController: Events.Reducers.ControllerInterface) =>
		(aggregatesServicesService: Aggregates.ServicesServiceInterface) =>
			eventReducersController
				.query(event)
				.then((definitionsWithReducers) => 
				Promise.all(
					[... new Set(
						definitionsWithReducers
						.flatMap(( { definition: { requiredAggregates } }) => requiredAggregates)
					)]
					.map(( { id: aggregateId, repositoryId } ) =>
						aggregatesServicesService.get(repositoryId)
							.then((aggregateService) => {
								if (aggregateService === null) {
									return Promise.reject("Failed Resolving Aggregate Service")
								}
								return aggregateService
							})
							.then((aggregatesService) => aggregatesService.get(aggregateId))
					)
				).then((aggregates) =>
					Promise.all(
						definitionsWithReducers
								.map(( { reducer }) => reducer(event)(aggregates))
					))
				)
				.then((outputEvents) => outputEvents.flatMap((outputEvent) => outputEvent));
