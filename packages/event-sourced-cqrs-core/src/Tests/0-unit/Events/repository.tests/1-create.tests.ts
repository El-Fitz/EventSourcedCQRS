// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-19 17:26:53 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:23:26
//  */

// import test from 'ava';
// import { v4 as uuid } from "uuid"
// import { DateTime } from "luxon"
// import Core from "event-sourced-cqrs-core"
// import Platform from "../../../../index.js"

// test('Events Repository Creation succeeds with proper parameter', async t => {
// 	let repository = Platform.Events.Repository()
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	await t.notThrows(async () => await repository.create(event));
// });

// test('Event is returned after creation', async t => {
// 	let repository = Platform.Events.Repository()
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	let createdDefinition= await repository.create(event)
// 	t.deepEqual(createdDefinition, event)
// });
