/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:19:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-28 00:27:36
 */

import test from 'ava';

const fn = () => 'foo';

test('fn() returns foo', t => {
	t.is(fn(), 'foo');
});

// import { TestFn } from 'ava';
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon";

// import * as Core from "../../../"
// import { Platform } from  "../../../"

// export default (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {

// 	test('A flow of events is ran the right number of times', async t => {
		
// 		const bodyLimit = 10
		
// 		let eventsAndReducers: {
// 			event: Core.Events.Event,
// 			eventReducerDefinitions: Core.Events.Reducers.Definitions.Definition[]
// 		}[] = [{
// 			id: uuid(),
// 			creationDate: DateTime.now(),
// 			instanceId: uuid(),
// 			tracingId: uuid(),
// 			version: "1.0.0",
// 			name: "first_event",
// 			body: 1
// 		}].map((event) => ({
// 			event,
// 			eventReducerDefinitions: [{
// 				id: uuid(),
// 				creationDate: DateTime.now(),
// 				triggeringEventId: event.id,
// 				requiredAggregates: [],
// 				reducer: () => Promise.resolve(((event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve(event.body === bodyLimit ? [] : [{
// 					id: event.id,
// 					creationDate: DateTime.now(),
// 					instanceId: uuid(),
// 					tracingId: event.tracingId,
// 					version: "1.0.0",
// 					name: `first_event+${event.body}`,
// 					body: event.body as number + 1
// 				}])))
// 			}]
// 		}))
		
// 		t.plan(bodyLimit * 2)
		
// 		let aggregatesReducersDefinitionsService = platform.Aggregates.Reducers.Definitions.Service
// 		let aggregatesServicesService = platform.Aggregates.ServicesService
// 		let eventsMessageBus = platform.Events.MessageBus
// 		let eventsService = platform.Events.Service
// 		let eventReducersDefinitionsService = platform.Events.Reducers.Definitions.Service;
		
// 		await Promise.all(
// 			eventsAndReducers
// 			.reduce((acc: Core.Events.Reducers.Definitions.Definition[], eventAndReducer) => acc.concat(eventAndReducer.eventReducerDefinitions), [])
// 			.map((eventReducerDefinition) => Promise.resolve(eventReducersDefinitionsService.create(eventReducerDefinition)))
// 		)
			
// 		const eventsController = (event: Core.Events.Event) => Core.Events.Controller(event)(eventReducersDefinitionsService)(aggregatesServicesService)(eventsService)(eventsMessageBus)(aggregatesReducersDefinitionsService)

// 		await new Promise<void>(async (resolve, _reject) => {
// 			eventsMessageBus.subscribe((event) => {
// 				t.is(event.id, eventsAndReducers[0].event.id)
// 				t.is(event.tracingId, eventsAndReducers[0].event.tracingId)
// 				if (event.body === bodyLimit) {
// 					resolve()
// 				}
// 				return eventsController(event).then(() => { })
// 			})

// 			await Promise.all(
// 				eventsAndReducers.map((eventAndReducers) => eventsService.create(eventAndReducers.event))
// 			).then(eventsMessageBus.emitMultiple)
// 		})
// 	});
	
	// test('A flow of events properly updates the events service', async t => {
	
	// 	const bodyLimit = 10
	
	// 	let eventsAndReducers: {
	// 		event: Core.Events.Event,
	// 		eventReducerDefinitions: Core.Events.Reducers.Definitions.Definition[]
	// 	}[] = [{
	// 		id: uuid(),
	// 		creationDate: DateTime.now(),
	// 		instanceId: uuid(),
	// 		tracingId: uuid(),
	// 		version: "1.0.0",
	// 		name: "first_event",
	// 		body: 1
	// 	}].map((event) => ({
	// 		event,
	// 		eventReducerDefinitions: [{
	// 			id: uuid(),
	// 			creationDate: DateTime.now(),
	// 			triggeringEventId: event.id,
	// 			requiredAggregates: [],
	// 			reducer: () => Promise.resolve(((event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve(event.body === bodyLimit ? [] : [{
	// 				id: event.id,
	// 				creationDate: DateTime.now(),
	// 				instanceId: uuid(),
	// 				tracingId: event.tracingId,
	// 				version: "1.0.0",
	// 				name: `first_event+${event.body}`,
	// 				body: event.body as number + 1
	// 			}])))
	// 		}]
	// 	}))
	
	// 	let aggregatesReducersDefinitionsService = Platform.Aggregates.Reducers.Definitions.Service()
	// 	let aggregatesServicesService = Platform.Aggregates.ServicesService()
	// 	let eventsMessageBus = Platform.Events.MessageBus()
	// 	let eventsService = Platform.Events.Service()
	// 	let eventReducersDefinitionsService = Platform.Events.Reducers.Definitions.Service();
	
	// 	await Promise.all(
	// 		eventsAndReducers
	// 			.reduce((acc: Core.Events.Reducers.Definitions.Definition[], eventAndReducer) => acc.concat(eventAndReducer.eventReducerDefinitions), [])
	// 			.map((eventReducerDefinition) => Promise.resolve(eventReducersDefinitionsService.create(eventReducerDefinition)))
	// 	)
	
	// 	const eventsController = (event: Core.Events.Event) => Core.Events.Controller(event)(eventReducersDefinitionsService)(aggregatesServicesService)(eventsService)(eventsMessageBus)(aggregatesReducersDefinitionsService)
	// 	await new Promise<void>(async (resolve, _reject) => {
	// 		eventsMessageBus
	// 		.subscribe((event) => {
	// 			if (event.body === bodyLimit) {
	// 				resolve()
	// 			}
	// 			return eventsController(event).then(() => { })
	// 		})
	// 		await Promise.all(
	// 			eventsAndReducers.map((eventAndReducers) => eventsService.create(eventAndReducers.event))
	// 		).then(eventsMessageBus.emitMultiple)
	// 	})
	
	// 	const eventsList = await eventsService.list()
	// 	t.is(eventsList.length, bodyLimit)
	// });
	// }