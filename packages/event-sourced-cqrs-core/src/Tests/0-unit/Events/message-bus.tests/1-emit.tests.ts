// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-26 16:26:03 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:21:55
//  */

// import test from "ava";
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon";

// import Core from "event-sourced-cqrs-core";
// import Platform from "../../../../index.js";

// test('Events Message Bus Event Emission succeeds with the proper parameters', async t => {
// 	let messageBus = Platform.Events.MessageBus()
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	await t.notThrows(async () => await await messageBus.emit(event))
// });

// test('Events Message Bus Event Emission returns void on success', async t => {
// 	let messageBus = Platform.Events.MessageBus()
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	let result = await t.notThrows(async () => await await messageBus.emit(event))
// 	t.is(result, (() => { return })());
// });
