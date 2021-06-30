// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-19 17:27:30 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:11:27
//  */

// import test from 'ava';
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon";

// import Core from "event-sourced-cqrs-core";
// import Platform from "../../../../../../index.js"

// test('Querying the repository will not throw when there are no definitions', async t => {
// 	let repository = Platform.Commands.Reducers.Definitions.Repository()
// 	let command: Core.Commands.Command = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	await t.notThrows(async () => await repository.query(command))
// });

// test('Querying the repository will return an empty array when there are no definitions', async t => {
// 	let repository = Platform.Commands.Reducers.Definitions.Repository()
// 	let command: Core.Commands.Command = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	let fetchedDefinitions = await repository.query(command)
// 	t.deepEqual(fetchedDefinitions, [])
// });

// test('Querying the repository will return an empty array when no definitions match the event', async t => {
// 	let repository = Platform.Commands.Reducers.Definitions.Repository()
// 	let command: Core.Commands.Command = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	let definition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: uuid(),
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	await repository.create(definition)
// 	let fetchedDefinition = await repository.query(command)
// 	t.deepEqual(fetchedDefinition, [])
// });

// test('Querying the repository will return a definition when one matches the command', async t => {
// 	let repository = Platform.Commands.Reducers.Definitions.Repository()
// 	let command: Core.Commands.Command = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	let definition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: command.id,
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	await repository.create(definition)
// 	let fetchedDefinition = await repository.query(command)
// 	t.deepEqual(fetchedDefinition, [definition])
// });

// test('Querying the repository will only return the definition matching the command', async t => {
// 	let repository = Platform.Commands.Reducers.Definitions.Repository()
// 	let command: Core.Commands.Command = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	let matchingDefinition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: command.id,
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	let nonMatchingDefinition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: uuid(),
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	await Promise.all([
// 		repository.create(matchingDefinition),
// 		repository.create(nonMatchingDefinition),
// 	])
// 	let fetchedDefinition = await repository.query(command)
// 	t.deepEqual(fetchedDefinition, [matchingDefinition])
// });


// test('Querying the repository will return every definition matching the command', async t => {
// 	let repository = Platform.Commands.Reducers.Definitions.Repository()
// 	let command: Core.Commands.Command = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	let firstMatchingDefinition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: command.id,
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	let secondMatchingDefinition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: command.id,
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	let nonMatchingDefinition: Core.Commands.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		triggeringCommandId: uuid(),
// 		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
// 	}
// 	await Promise.all([
// 		repository.create(firstMatchingDefinition),
// 		repository.create(secondMatchingDefinition),
// 		repository.create(nonMatchingDefinition),
// 	])
// 	let fetchedDefinition = await repository.query(command)
// 	t.deepEqual(fetchedDefinition, [firstMatchingDefinition, secondMatchingDefinition])
// });