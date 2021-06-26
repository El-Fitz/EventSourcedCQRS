/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 19:19:42
 */


import test from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon"
import Core from "event-sourced-cqrs-core"
import Platform from "../../../../src/index.js"

test('Command can be retrieved after creation', async t => {
	let repository = Platform.Commands.Repository()
	let command: Core.Commands.Command = {
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "command_name",
		body: { }
	}
	await repository.create(command)
	await t.notThrows(async () => await repository.get(command.id))
});

test('The repository returns the expected Command', async t => {
	let repository = Platform.Commands.Repository()
	let command: Core.Commands.Command = {
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "command_name",
		body: { }
	}
	await repository.create(command)
	let fetchedDefinition = await repository.get(command.id)
	t.deepEqual(fetchedDefinition, command)
});

test('The repository returns null when the requested Command does not exist', async t => {
	let repository = Platform.Commands.Repository()
	let command: Core.Commands.Command = {
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "command_name",
		body: { }
	}
	let fetchedDefinition = await repository.get(command.id)
	t.deepEqual(fetchedDefinition, null);
});