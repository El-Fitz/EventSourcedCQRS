// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-19 17:27:26 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-27 00:44:08
//  */


// import test from 'ava';
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon"
// import Core from "event-sourced-cqrs-core"
// import Platform from "../../../../index.js"

// test('Event can be retrieved after creation', async t => {
// 	let service = Platform.Events.Service()
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	await service.create(event)
// 	await t.notThrows(async () => await service.get(event.id, event.instanceId))
// });

// test('The service returns the expected Event', async t => {
// 	let service = Platform.Events.Service()
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	await service.create(event)
// 	let fetchedDefinition = await service.get(event.id, event.instanceId)
// 	t.deepEqual(fetchedDefinition, event)
// });

// test('The service returns null when the requested Event does not exist', async t => {
// 	let service = Platform.Events.Service()
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	let fetchedDefinition = await service.get(event.id, event.instanceId)
// 	t.deepEqual(fetchedDefinition, null);
// });