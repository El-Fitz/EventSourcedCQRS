/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:44:09 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:52:29
 */

import * as Aggregates from "../Aggregates";
import * as Events from ".";

// This return Promise<[void, Promise<blabla>[]]> instead of Promise<[void, blabla[]]>
export const EventsController = (event: Events.Event) =>
	(eventReducersController: Events.Reducers.ControllerInterface) =>
		(aggregatesServicesService: Aggregates.ServicesServiceInterface) =>
			(eventsService: Events.ServiceInterface) =>
				(eventsMessageBus?: Events.MessageBus) =>
					(aggregatesReducersController: Aggregates.Reducers.ControllerInterface) =>
						Promise.all([
							Events.Reducer(event)(eventReducersController)(aggregatesServicesService)
								.then((events) => Promise.all(events.map(eventsService.create)))
								.then(eventsMessageBus?.emitMultiple),
							Aggregates.Reducer(event)(aggregatesServicesService)(aggregatesReducersController)
								.then((aggregates) => 
									Promise.all(
										aggregates.map((aggregate) =>
											aggregatesServicesService.get(aggregate.repositoryId)
												.then((aggregateService) => {
													if (aggregateService === null) {
														return Promise.reject("Failed Resolving Aggregate Service")
													}
													return aggregateService
												})
												.then((aggregateService) => aggregateService.create(aggregate))
										)
									).then(() => { })
								)
								.then(() => { }),
						])