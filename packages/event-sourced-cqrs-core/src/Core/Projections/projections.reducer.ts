/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 19:07:34 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 16:01:32
 */

import { Core } from '../../';

export const ProjectionsReducer = (event: Core.Events.Event) =>
	(aggregatesServicesService: Core.Aggregates.ServicesServiceInterface) =>
		(projectionReducersController: Core.Projections.Reducers.ControllerInterface) =>
			projectionReducersController
				.query(event)
				.then((definitionsWithReducers) =>
					Promise.all(
						[... new Set(
							definitionsWithReducers
							.flatMap(( { definition: { requiredAggregates } }) => requiredAggregates)
						)]
						.map((requiredAggregate) => aggregatesServicesService.get(requiredAggregate.repositoryId).then((aggregatesService) => aggregatesService === null ? Promise.resolve(null) : aggregatesService.get(requiredAggregate.id)))
					).then((aggregates) => {
						if (aggregates.includes(null)) {
							return Promise.reject("Failed resolving some aggregates")
						}
						return aggregates as Core.Aggregates.Aggregate[]
					}).then((aggregates) => 
						Promise.all(
							definitionsWithReducers
								.map(( { reducer }) => reducer(event)(aggregates))
						))
				).then((projectionsPromises) => projectionsPromises.flatMap((projectionPromise) => projectionPromise));
