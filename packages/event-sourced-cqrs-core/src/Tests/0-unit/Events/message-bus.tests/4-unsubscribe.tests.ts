// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-26 16:25:56 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:21:35
//  */

// import test from "ava";
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon";

// import Core from "event-sourced-cqrs-core";
// import Platform from "../../../../index.js";

// test('Events Message Bus Event Unsubscribing succeeds with the proper parameters', t => {
// 	const messageBus = Platform.Events.MessageBus()
// 	const messageBusSubscriptionCallback = (_event: Core.Events.Event) => Promise.resolve()
// 	const subscriberId = messageBus.subscribe(messageBusSubscriptionCallback)
// 	t.notThrows(() => messageBus.unsubscribe(subscriberId))
// });

// test('Events Message Bus Event Unsubscribing returns void on success', t => {
// 	const messageBus = Platform.Events.MessageBus()
// 	const messageBusSubscriptionCallback = (_event: Core.Events.Event) => Promise.resolve()
// 	const subscriberId = messageBus.subscribe(messageBusSubscriptionCallback)
// 	const result = messageBus.unsubscribe(subscriberId)
// 	t.is(result, undefined)
// });

// test('Events Message Bus Event Unsubscribing twice does not fail', t => {
// 	const messageBus = Platform.Events.MessageBus()
// 	const messageBusSubscriptionCallback = (_event: Core.Events.Event) => Promise.resolve()
// 	const subscriberId = messageBus.subscribe(messageBusSubscriptionCallback)
// 	messageBus.unsubscribe(subscriberId)
// 	t.notThrows(() => messageBus.unsubscribe(subscriberId))
// });

// test('Events Message Bus Event Emission triggers subscriber callback only as long as said subscriber is subscribed', async t => {
// 	const messageBus = Platform.Events.MessageBus()
// 	t.plan(1)
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	const messageBusSubscriptionCallback = (emittedEvent: Core.Events.Event) => {
// 		t.deepEqual(emittedEvent, event)
// 		return Promise.resolve()
// 	}
// 	let subscriberId = messageBus.subscribe(messageBusSubscriptionCallback)

// 	await messageBus.emit(event);
// 	messageBus.unsubscribe(subscriberId);
// 	await messageBus.emit(event);
// });
