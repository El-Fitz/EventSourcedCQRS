/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 22:36:59
 */

import test from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import Core from "event-sourced-cqrs-core";
import Platform from "../../../../../../src/index.js";

test('Querying the repository will not throw when there are no definitions', async t => {
	let repository = Platform.Aggregates.Reducers.Definitions.Repository();
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
	let repository = Platform.Aggregates.Reducers.Definitions.Repository();
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
	let repository = Platform.Aggregates.Reducers.Definitions.Repository();
	let event: Core.Events.Event = {
    id: uuid(),
    creationDate: DateTime.now(),
    instanceId: uuid(),
    tracingId: uuid(),
    version: "1.0.0",
    name: "name",
    body:  { }
	}
	let reducer: Core.Aggregates.Reducers.Reducer = (event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => {
		return {
			id: uuid(),
			tracingId: event.tracingId,
			creationDate: DateTime.now(),
			updatedAt: null,
			repositoryId: uuid(),
			versionNumber: "1.0.0",
			value: event.body,
		}
	}
	let definition: Core.Aggregates.Reducers.Definitions.Definition = {
    id: uuid(),
    creationDate: DateTime.now(),
    triggeringEventId: uuid(),
    requiredAggregates: [],
    reducer: () => Promise.resolve(reducer),
	}
	await repository.create(definition)
	let fetchedDefinition = await repository.query(event)
	t.deepEqual(fetchedDefinition, [])
});

test('Querying the repository will return a definition when one matches the event', async t => {
	let repository = Platform.Aggregates.Reducers.Definitions.Repository();
	let event: Core.Events.Event = {
    id: uuid(),
    creationDate: DateTime.now(),
    instanceId: uuid(),
    tracingId: uuid(),
    version: "1.0.0",
    name: "name",
    body:  { }
	}
	let reducer: Core.Aggregates.Reducers.Reducer = (event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => {
		return {
			id: uuid(),
			tracingId: event.tracingId,
			creationDate: DateTime.now(),
			updatedAt: null,
			repositoryId: uuid(),
			versionNumber: "1.0.0",
			value: event.body,
		}
	}
	let definition: Core.Aggregates.Reducers.Definitions.Definition = {
    id: uuid(),
    creationDate: DateTime.now(),
    triggeringEventId: event.id,
    requiredAggregates: [],
    reducer: () => Promise.resolve(reducer),
	}
	await repository.create(definition)
	let fetchedDefinition = await repository.query(event)
	t.deepEqual(fetchedDefinition, [definition])
});

test('Querying the repository will only return the definition matching the event', async t => {
	let repository = Platform.Aggregates.Reducers.Definitions.Repository();
	let event: Core.Events.Event = {
    id: uuid(),
    creationDate: DateTime.now(),
    instanceId: uuid(),
    tracingId: uuid(),
    version: "1.0.0",
    name: "name",
    body:  { }
	}
	let reducer: Core.Aggregates.Reducers.Reducer = (event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => {
		return {
			id: uuid(),
			tracingId: event.tracingId,
			creationDate: DateTime.now(),
			updatedAt: null,
			repositoryId: uuid(),
			versionNumber: "1.0.0",
			value: event.body,
		}
	}
	let matchingDefinition: Core.Aggregates.Reducers.Definitions.Definition = {
    id: uuid(),
    creationDate: DateTime.now(),
    triggeringEventId: event.id,
    requiredAggregates: [],
    reducer: () => Promise.resolve(reducer),
	}
	let nonMatchingDefinition: Core.Aggregates.Reducers.Definitions.Definition = {
    id: uuid(),
    creationDate: DateTime.now(),
    triggeringEventId: uuid(),
    requiredAggregates: [],
    reducer: () => Promise.resolve(reducer),
	}
	await Promise.all([
		repository.create(matchingDefinition),
		repository.create(nonMatchingDefinition),
	])
	let fetchedDefinition = await repository.query(event)
	t.deepEqual(fetchedDefinition, [matchingDefinition])
});


test('Querying the repository will return every definition matching the event', async t => {
	let repository = Platform.Aggregates.Reducers.Definitions.Repository();
	let event: Core.Events.Event = {
    id: uuid(),
    creationDate: DateTime.now(),
    instanceId: uuid(),
    tracingId: uuid(),
    version: "1.0.0",
    name: "name",
    body:  { }
	}
	let reducer: Core.Aggregates.Reducers.Reducer = (event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => {
		return {
			id: uuid(),
			tracingId: event.tracingId,
			creationDate: DateTime.now(),
			updatedAt: null,
			repositoryId: uuid(),
			versionNumber: "1.0.0",
			value: event.body,
		}
	}
	let firstMatchingDefinition: Core.Aggregates.Reducers.Definitions.Definition = {
    id: uuid(),
    creationDate: DateTime.now(),
    triggeringEventId: event.id,
    requiredAggregates: [],
    reducer: () => Promise.resolve(reducer),
	}
	let secondMatchingDefinition: Core.Aggregates.Reducers.Definitions.Definition = {
    id: uuid(),
    creationDate: DateTime.now(),
    triggeringEventId: event.id,
    requiredAggregates: [],
    reducer: () => Promise.resolve(reducer),
	}
	let nonMatchingDefinition: Core.Aggregates.Reducers.Definitions.Definition = {
    id: uuid(),
    creationDate: DateTime.now(),
    triggeringEventId: uuid(),
    requiredAggregates: [],
    reducer: () => Promise.resolve(reducer),
	}
	await Promise.all([
		repository.create(firstMatchingDefinition),
		repository.create(secondMatchingDefinition),
		repository.create(nonMatchingDefinition),
	])
	let fetchedDefinition = await repository.query(event)
	t.deepEqual(fetchedDefinition, [firstMatchingDefinition, secondMatchingDefinition])
});