/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-26 16:25:56 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 18:11:56
 */

import test from "ava";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import Core from "event-sourced-cqrs-core";
import Platform from "../../../../src/index.js";

test('Commands Message Bus Command Unsubscribing succeeds with the proper parameters', t => {
	const messageBus = Platform.Commands.MessageBus()
	const messageBusSubscriptionCallback = (_command: Core.Commands.Command) => Promise.resolve()
	const subscriberId = messageBus.subscribe(messageBusSubscriptionCallback)
	t.notThrows(() => messageBus.unsubscribe(subscriberId))
});

test('Commands Message Bus Command Unsubscribing returns void on success', t => {
	const messageBus = Platform.Commands.MessageBus()
	const messageBusSubscriptionCallback = (_command: Core.Commands.Command) => Promise.resolve()
	const subscriberId = messageBus.subscribe(messageBusSubscriptionCallback)
	const result = messageBus.unsubscribe(subscriberId)
	t.is(result, undefined)
});

test('Commands Message Bus Command Unsubscribing twice does not fail', t => {
	const messageBus = Platform.Commands.MessageBus()
	const messageBusSubscriptionCallback = (_command: Core.Commands.Command) => Promise.resolve()
	const subscriberId = messageBus.subscribe(messageBusSubscriptionCallback)
	messageBus.unsubscribe(subscriberId)
	t.notThrows(() => messageBus.unsubscribe(subscriberId))
});

test('Commands Message Bus Command Emission triggers subscriber callback only as long as said subscriber is subscribed', async t => {
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
	let subscriberId = messageBus.subscribe(messageBusSubscriptionCallback)

	await messageBus.emit(command);
	messageBus.unsubscribe(subscriberId);
	await messageBus.emit(command);
});
