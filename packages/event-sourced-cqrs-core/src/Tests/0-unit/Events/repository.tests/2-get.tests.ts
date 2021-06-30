// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-19 17:27:26 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-27 00:44:27
//  */


// import test from 'ava';
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon"
// import Core from "event-sourced-cqrs-core"
// import Platform from "../../../../index.js"

// test('Event can be retrieved after creation', async t => {
// 	let repository = Platform.Events.Repository()
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	await repository.create(event)
// 	await t.notThrows(async () => await repository.get(event.id, event.instanceId))
// });

// test('The repository returns the expected Event', async t => {
// 	let repository = Platform.Events.Repository()
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	await repository.create(event)
// 	let fetchedDefinition = await repository.get(event.id, event.instanceId)
// 	t.deepEqual(fetchedDefinition, event)
// });

// test('The repository returns null when the requested Event does not exist', async t => {
// 	let repository = Platform.Events.Repository()
// 	let event: Core.Events.Event = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "event_name",
// 		body: { }
// 	}
// 	let fetchedDefinition = await repository.get(event.id, event.instanceId)
// 	t.deepEqual(fetchedDefinition, null);
// });