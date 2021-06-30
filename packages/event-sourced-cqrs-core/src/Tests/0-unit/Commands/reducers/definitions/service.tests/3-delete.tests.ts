// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-19 17:27:33 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:10:21
//  */

// import test from 'ava';
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon"
// import Core from "event-sourced-cqrs-core"
// import Platform from "../../../../../../index.js"

// test('Command Reducer Definition can be deleted after creation', async t => {
// 	let service = Platform.Commands.Reducers.Definitions.Service()
// 	let definition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: uuid(),
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	await service.create(definition)
// 	await t.notThrows(async () => await service.delete(definition))
// });

// test('The service does not return the Command Reducer Definition once it has been deleted', async t => {
// 	let service = Platform.Commands.Reducers.Definitions.Service()
// 	let definition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: uuid(),
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	await service.create(definition)
// 	await service.delete(definition)
// 	let fetchedDefinition = await service.get(definition.id)
// 	t.deepEqual(fetchedDefinition, null)
// });