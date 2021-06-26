/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-26 16:25:58 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 18:01:46
 */

import test from "ava";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import Core from "event-sourced-cqrs-core";
import Platform from "../../../../src/index.js";

test('Commands Message Bus Command Subscription succeeds with the proper parameters', t => {
	const messageBus = Platform.Commands.MessageBus()
	const messageBusSubscriptionCallback = (_command: Core.Commands.Command) => Promise.resolve()
	t.notThrows(() => messageBus.subscribe(messageBusSubscriptionCallback))
});

test('Commands Message Bus Command Emission returns void on success', t => {
	const messageBus = Platform.Commands.MessageBus()
	const messageBusSubscriptionCallback = (_command: Core.Commands.Command) => Promise.resolve()
	const subscriberId = messageBus.subscribe(messageBusSubscriptionCallback)
	t.not(subscriberId, undefined)
});

test('Commands Message Bus Command Emission triggers subscriber callback exactly once on command emission when there is a single subscriber', async t => {
	const messageBus = Platform.Commands.MessageBus()
	t.plan(1)
	let command: Core.Commands.Command = {
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "command_name",
		body: { }
	}
	const messageBusSubscriptionCallback = (emittedCommand: Core.Commands.Command) => {
		t.deepEqual(emittedCommand, command)
		return Promise.resolve()
	}
	messageBus.subscribe(messageBusSubscriptionCallback)

	await messageBus.emit(command);
});

test('Commands Message Bus Command Emission triggers subscriber callback exactly once on each command emission when there is a single subscriber', async t => {
	const messageBus = Platform.Commands.MessageBus()
	let commands: Core.Commands.Command[] = [{
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "command_name",
		body: { }
	}, {
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "2.0.0",
		name: "second_command",
		body: { }
	}, {
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "2.0.0",
		name: "third_command",
		body: { }
	}]
	t.plan(commands.length)
	const messageBusSubscriptionCallback = (emittedCommand: Core.Commands.Command) => {
		t.deepEqual(emittedCommand, commands.pop())
		return Promise.resolve()
	}
	messageBus.subscribe(messageBusSubscriptionCallback)

	for (const command of commands.slice().reverse()) {
		await messageBus.emit(command);
	}
});

test('Commands Message Bus Command Emission triggers subscriber callback exactly once on each command emission for each subscriber', async t => {
	const messageBus = Platform.Commands.MessageBus()
	const subscribersCount = 3
	let commands: Core.Commands.Command[] = [{
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "command_name",
		body: { }
	}, {
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "2.0.0",
		name: "second_command",
		body: { }
	}, {
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "3.0.0",
		name: "third_command",
		body: { }
	}]
	const subscribers: ((emittedCommand: Core.Commands.Command) => Promise<void>)[] = (() => {
		return new Array(subscribersCount)
			.fill(0)
			.map(() => {
				let index = 0;
				return (emittedCommand: Core.Commands.Command) => {
					t.deepEqual(emittedCommand, commands[index]);
					index += 1
					return Promise.resolve()
				}
		})
	})()

	t.plan(commands.length * subscribersCount)
	
	for (let subscriber of subscribers) {
		messageBus.subscribe(subscriber)
	}

	for (const command of commands) {
		await messageBus.emit(command)
	}
});
