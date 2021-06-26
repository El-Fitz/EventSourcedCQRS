/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 19:26:58
 */

import test from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import Core from "event-sourced-cqrs-core";
import Platform from "../../../../../../src/index.js"

test('Querying the repository will not throw when there are no definitions', async t => {
	let repository = Platform.Events.Reducers.Definitions.Repository()
	let event: Core.Events.Event = {
    id: uuid(),
    creationDate: DateTime.now(),
    instanceId: uuid(),
    tracingId: uuid(),
    version: "1.0.0",
    name: "name",
    body:  { }
	}
	await t.notThrows(async () => await repository.query(event))
});

test('Querying the repository will return an empty array when there are no definitions', async t => {
	let repository = Platform.Events.Reducers.Definitions.Repository()
	let event: Core.Events.Event = {
    id: uuid(),
    creationDate: DateTime.now(),
    instanceId: uuid(),
    tracingId: uuid(),
    version: "1.0.0",
    name: "name",
    body:  { }
	}
	let fetchedDefinitions = await repository.query(event)
	t.deepEqual(fetchedDefinitions, [])
});

test('Querying the repository will return an empty array when no definitions match the event', async t => {
	let repository = Platform.Events.Reducers.Definitions.Repository()
	let event: Core.Events.Event = {
    id: uuid(),
    creationDate: DateTime.now(),
    instanceId: uuid(),
    tracingId: uuid(),
    version: "1.0.0",
    name: "name",
    body:  { }
	}
	let definition: Core.Events.Reducers.Definitions.Definition = {
		id: uuid(),
		creationDate: DateTime.now(),
		requiredAggregates: [],
		triggeringEventId: uuid(),
		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
	}
	await repository.create(definition)
	let fetchedDefinition = await repository.query(event)
	t.deepEqual(fetchedDefinition, [])
});

test('Querying the repository will return a definition when one matches the event', async t => {
	let repository = Platform.Events.Reducers.Definitions.Repository()
	let event: Core.Events.Event = {
    id: uuid(),
    creationDate: DateTime.now(),
    instanceId: uuid(),
    tracingId: uuid(),
    version: "1.0.0",
    name: "name",
    body:  { }
	}
	let definition: Core.Events.Reducers.Definitions.Definition = {
		id: uuid(),
		creationDate: DateTime.now(),
		requiredAggregates: [],
		triggeringEventId: event.id,
		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
	}
	await repository.create(definition)
	let fetchedDefinition = await repository.query(event)
	t.deepEqual(fetchedDefinition, [definition])
});

test('Querying the repository will only return the definition matching the event', async t => {
	let repository = Platform.Events.Reducers.Definitions.Repository()
	let event: Core.Events.Event = {
    id: uuid(),
    creationDate: DateTime.now(),
    instanceId: uuid(),
    tracingId: uuid(),
    version: "1.0.0",
    name: "name",
    body:  { }
	}
	let matchingDefinition: Core.Events.Reducers.Definitions.Definition = {
		id: uuid(),
		creationDate: DateTime.now(),
		requiredAggregates: [],
		triggeringEventId: event.id,
		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
	}
	let nonMatchingDefinition: Core.Events.Reducers.Definitions.Definition = {
		id: uuid(),
		creationDate: DateTime.now(),
		requiredAggregates: [],
		triggeringEventId: uuid(),
		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
	}
	await Promise.all([
		repository.create(matchingDefinition),
		repository.create(nonMatchingDefinition),
	])
	let fetchedDefinition = await repository.query(event)
	t.deepEqual(fetchedDefinition, [matchingDefinition])
});


test('Querying the repository will return every definition matching the event', async t => {
	let repository = Platform.Events.Reducers.Definitions.Repository()
	let event: Core.Events.Event = {
    id: uuid(),
    creationDate: DateTime.now(),
    instanceId: uuid(),
    tracingId: uuid(),
    version: "1.0.0",
    name: "name",
    body:  { }
	}
	let firstMatchingDefinition: Core.Events.Reducers.Definitions.Definition = {
		id: uuid(),
		creationDate: DateTime.now(),
		requiredAggregates: [],
		triggeringEventId: event.id,
		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
	}
	let secondMatchingDefinition: Core.Events.Reducers.Definitions.Definition = {
		id: uuid(),
		creationDate: DateTime.now(),
		requiredAggregates: [],
		triggeringEventId: event.id,
		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
	}
	let nonMatchingDefinition: Core.Events.Reducers.Definitions.Definition = {
		id: uuid(),
		creationDate: DateTime.now(),
		requiredAggregates: [],
		triggeringEventId: uuid(),
		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
	}
	await Promise.all([
		repository.create(firstMatchingDefinition),
		repository.create(secondMatchingDefinition),
		repository.create(nonMatchingDefinition),
	])
	let fetchedDefinition = await repository.query(event)
	t.deepEqual(fetchedDefinition, [firstMatchingDefinition, secondMatchingDefinition])
});