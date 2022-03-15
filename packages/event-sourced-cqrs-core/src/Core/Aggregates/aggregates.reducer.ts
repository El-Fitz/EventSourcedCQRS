/*
* @Author: Thomas Léger 
* @Date: 2021-06-11 19:07:34 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:51:19
*/

import * as Events from "../Events"
import * as Aggregates from ".";

export const AggregatesReducer = (event: Events.Event) =>
	(aggregatesServicesService: Aggregates.ServicesServiceInterface) =>
		(aggregatesReducersController: Aggregates.Reducers.ControllerInterface) =>
			aggregatesReducersController.query(event)
					.then((definitionsWithReducers) =>
						Promise.all(
							[... new Set(
								definitionsWithReducers
								.flatMap(( { definition: { requiredAggregates } }) => requiredAggregates)
							)]
							.map(( { id: aggregateId, repositoryId } ) => aggregatesServicesService.get(repositoryId).then((aggregatesService) => aggregatesService === null ? Promise.resolve(null) : aggregatesService.get(aggregateId)))
						).then((aggregates) => {
							if (aggregates.includes(null)) {
								return Promise.reject("Failed resolving some aggregates")
							}
							return aggregates as Aggregates.Aggregate[]
						}).then((aggregates) => 
							Promise.all(
								definitionsWithReducers
									.map(( { reducer }) => reducer(event)(aggregates))
							))
						)
						.then((aggregatesPromises) => aggregatesPromises.flatMap((aggregatePromise) => aggregatePromise));
								