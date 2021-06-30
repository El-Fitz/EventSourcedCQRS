// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-26 16:25:58 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:21:32
//  */

// import test from "ava";
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon";

// import Core from "event-sourced-cqrs-core";
// import Platform from "../../../../index.js";

// test('Events Message Bus Event Subscription succeeds with the proper parameters', t => {
// 	const messageBus = Platform.Events.MessageBus()
// 	const messageBusSubscriptionCallback = (_event: Core.Events.Event) => Promise.resolve()
// 	t.notThrows(() => messageBus.subscribe(messageBusSubscriptionCallback))
// });

// test('Events Message Bus Event Emission returns void on success', t => {
// 	const messageBus = Platform.Events.MessageBus()
// 	const messageBusSubscriptionCallback = (_event: Core.Events.Event) => Promise.resolve()
// 	const subscriberId = messageBus.subscribe(messageBusSubscriptionCallback)
// 	t.not(subscriberId, undefined)
// });

// test('Events Message Bus Event Emission triggers subscriber callback exactly once on event emission when there is a single subscriber', async t => {
// 	const messageBus = Platform.Events.MessageBus()
// 	t.plan(1)
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	const messageBusSubscriptionCallback = (emittedEvent: Core.Events.Event) => {
// 		t.deepEqual(emittedEvent, event)
// 		return Promise.resolve()
// 	}
// 	messageBus.subscribe(messageBusSubscriptionCallback)

// 	await messageBus.emit(event);
// });

// test('Events Message Bus Event Emission triggers subscriber callback exactly once on each event emission when there is a single subscriber', async t => {
// 	const messageBus = Platform.Events.MessageBus()
// 	let events: Core.Events.Event[] = [{
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}, {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "2.0.0",
// 		name: "second_event",
// 		body: { }
// 	}, {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "2.0.0",
// 		name: "third_event",
// 		body: { }
// 	}]
// 	t.plan(events.length)
// 	const messageBusSubscriptionCallback = (emittedEvent: Core.Events.Event) => {
// 		t.deepEqual(emittedEvent, events.pop())
// 		return Promise.resolve()
// 	}
// 	messageBus.subscribe(messageBusSubscriptionCallback)

// 	for (const event of events.slice().reverse()) {
// 		await messageBus.emit(event);
// 	}
// });

// test('Events Message Bus Event Emission triggers subscriber callback exactly once on each event emission for each subscriber', async t => {
// 	const messageBus = Platform.Events.MessageBus()
// 	const subscribersCount = 3
// 	let events: Core.Events.Event[] = [{
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}, {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "2.0.0",
// 		name: "second_event",
// 		body: { }
// 	}, {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "3.0.0",
// 		name: "third_event",
// 		body: { }
// 	}]
// 	const subscribers: ((emittedEvent: Core.Events.Event) => Promise<void>)[] = (() => {
// 		return new Array(subscribersCount)
// 			.fill(0)
// 			.map(() => {
// 				let index = 0;
// 				return (emittedEvent: Core.Events.Event) => {
// 					t.deepEqual(emittedEvent, events[index]);
// 					index += 1
// 					return Promise.resolve()
// 				}
// 		})
// 	})()

// 	t.plan(events.length * subscribersCount)
	
// 	for (let subscriber of subscribers) {
// 		messageBus.subscribe(subscriber)
// 	}

// 	for (const event of events) {
// 		await messageBus.emit(event)
// 	}
// });
