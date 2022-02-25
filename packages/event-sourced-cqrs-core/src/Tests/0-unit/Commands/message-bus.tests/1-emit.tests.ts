// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-26 16:26:03 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 16:47:19
//  */

// import test from "ava";
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon";

// import Core from "event-sourced-cqrs-core";
// import Platform from "../../../../index.js";

// test('Commands Message Bus Command Emission succeeds with the proper parameters', async t => {
// 	let messageBus = Platform.Commands.MessageBus()
// 	let command: Core.Commands.Command = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "command_name",
// 		body: { }
// 	}
// 	await t.notThrows(async () => await await messageBus.emit(command))
// });

// test('Commands Message Bus Command Emission returns void on success', async t => {
// 	let messageBus = Platform.Commands.MessageBus()
// 	let command: Core.Commands.Command = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		instanceId: uuid(),
// 		tracingId: uuid(),
// 		version: "1.0.0",
// 		name: "command_name",
// 		body: { }
// 	}
// 	let result = await t.notThrows(async () => await await messageBus.emit(command))
// 	t.is(result, (() => { return })());
// });
