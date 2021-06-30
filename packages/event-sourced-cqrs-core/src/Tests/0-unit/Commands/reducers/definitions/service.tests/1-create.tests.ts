// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-19 17:26:53 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:10:11
//  */

// import test from 'ava';
// import { v4 as uuid } from "uuid"
// import { DateTime } from "luxon"
// import Core from "event-sourced-cqrs-core"
// import Platform from "../../../../../../index.js"

// test('Command Reducers Definitions Service Creation succeeds with proper parameter', async t => {
// 	let service = Platform.Commands.Reducers.Definitions.Service()
// 	let definition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: uuid(),
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	await t.notThrows(async () => await service.create(definition));
// });

// test('Command Reducers Definition is returned after creation', async t => {
// 	let service = Platform.Commands.Reducers.Definitions.Service()
// 	let definition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: uuid(),
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	let createdDefinition= await service.create(definition)
// 	t.deepEqual(createdDefinition, definition)
// });
