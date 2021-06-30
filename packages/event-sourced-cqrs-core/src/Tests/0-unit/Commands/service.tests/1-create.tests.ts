// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-19 17:26:53 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:19:52
//  */

// import test from 'ava';
// import { v4 as uuid } from "uuid"
// import { DateTime } from "luxon"
// import Core from "event-sourced-cqrs-core"
// import Platform from "../../../../index.js"

// test('Commands Service Creation succeeds with proper parameter', async t => {
// 	let service = Platform.Commands.Service()
// 	let command: Core.Commands.Command = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "command_name",
// 		body: { }
// 	}
// 	await t.notThrows(async () => await service.create(command));
// });

// test('Command is returned after creation', async t => {
// 	let service = Platform.Commands.Service()
// 	let command: Core.Commands.Command = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "command_name",
// 		body: { }
// 	}
// 	let createdDefinition= await service.create(command)
// 	t.deepEqual(createdDefinition, command)
// });
