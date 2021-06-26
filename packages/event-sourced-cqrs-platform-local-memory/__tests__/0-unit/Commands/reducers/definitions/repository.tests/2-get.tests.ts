/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 19:11:45
 */


import test from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon"
import Core from "event-sourced-cqrs-core"
import Platform from "../../../../../../src/index.js"

test('Command Reducer Definition can be retrieved after creation', async t => {
	let repository = Platform.Commands.Reducers.Definitions.Repository()
	let definition: Core.Commands.Reducers.Definitions.Definition = {
		id: uuid(),
		creationDate: DateTime.now(),
		triggeringCommandId: uuid(),
		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
	}
	await repository.create(definition)
	await t.notThrows(async () => await repository.get(definition.id))
});

test('The repository returns the expected Command Reducer Definition', async t => {
	let repository = Platform.Commands.Reducers.Definitions.Repository()
	let definition: Core.Commands.Reducers.Definitions.Definition = {
		id: uuid(),
		creationDate: DateTime.now(),
		triggeringCommandId: uuid(),
		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
	}
	await repository.create(definition)
	let fetchedDefinition = await repository.get(definition.id)
	t.deepEqual(fetchedDefinition, definition)
});

test('The repository returns null when the requested Command Reducer Definition does not exist', async t => {
	let repository = Platform.Commands.Reducers.Definitions.Repository()
	let definition: Core.Commands.Reducers.Definitions.Definition = {
		id: uuid(),
		creationDate: DateTime.now(),
		triggeringCommandId: uuid(),
		reducer: () => Promise.resolve((_command: Core.Commands.Command) => Promise.resolve([]))
	}
	let fetchedDefinition = await repository.get(definition.id)
	t.deepEqual(fetchedDefinition, null);
});