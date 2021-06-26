/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-26 16:26:01 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 19:21:52
 */

import test from "ava";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import Core from "event-sourced-cqrs-core";
import Platform from "../../../../src/index.js";

test('Events Message Bus Multiple Events Emission succeeds with the proper parameters', async t => {
	let messageBus = Platform.Events.MessageBus()
	let events: Core.Events.Event[] = [{
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "event_name",
		body: { }
	},{
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "event_name",
		body: { }
	},{
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "event_name",
		body: { }
	}]
	await t.notThrows(async () => await await messageBus.emitMultiple(events))
});

test('Events Message Bus Event Emission returns void on success', async t => {
	let messageBus = Platform.Events.MessageBus()
	let events: Core.Events.Event[] = [{
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "event_name",
		body: { }
	},{
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "event_name",
		body: { }
	},{
		id: uuid(),
		creationDate: DateTime.now(),
		instanceId: uuid(),
		tracingId: uuid(),
		version: "1.0.0",
		name: "event_name",
		body: { }
	}]
	let result = await t.notThrows(async () => await await messageBus.emitMultiple(events))
	t.is(result, (() => { return })());
});
