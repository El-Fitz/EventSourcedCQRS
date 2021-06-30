/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:44:09 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:21:37
 */

import * as Aggregates from "../Aggregates";
import * as Events from "./";

// This return Promise<[void, Promise<blabla>[]]> instead of Promise<[void, blabla[]]>
export const EventsController = (event: Events.Event) =>
	(eventReducersDefinitionsService: Events.Reducers.Definitions.ServiceInterface) =>
		(aggregatesServicesService: Aggregates.ServicesServiceInterface) =>
			(eventsService: Events.ServiceInterface) =>
				(eventsMessageBus?: Events.MessageBus) =>
					(aggregateReducersDefinitionsService: Aggregates.Reducers.Definitions.ServiceInterface) =>
						Promise.all([
							Events.Reducer(event)(eventReducersDefinitionsService)(aggregatesServicesService)
								.then((events) => Promise.all(events.map(eventsService.create)))
								.then(eventsMessageBus?.emitMultiple),
							Aggregates.Reducer(event)(aggregatesServicesService)(aggregateReducersDefinitionsService)
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