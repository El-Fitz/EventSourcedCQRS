/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 22:37:09
 */


import test from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import Core from "event-sourced-cqrs-core";
import Platform from "../../../../../../src/index.js";

test('Reducer Definition can be retrieved after creation', async t => {
	let service = Platform.Aggregates.Reducers.Definitions.Service()
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
	await service.create(definition);
	await t.notThrows(async () => await service.get(definition.id))
});

test('The service returns the expected reducer definition', async t => {
	let service = Platform.Aggregates.Reducers.Definitions.Service()
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
	await service.create(definition)
	let fetchedDefinition = await service.get(definition.id)
	t.deepEqual(fetchedDefinition, [definition])
});

test('The service returns an empty array when the requested reducer definition does not exist', async t => {
	let service = Platform.Aggregates.Reducers.Definitions.Service()
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
	await service.create(definition)
	let fetchedDefinition = await service.get(uuid())
	t.deepEqual(fetchedDefinition, [])
});