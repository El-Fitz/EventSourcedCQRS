/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 22:36:56
 */

import test from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import Core from "event-sourced-cqrs-core";
import Platform from "../../../../../../src/index.js";

test('Reducer Definition can be deleted after creation', async t => {
	let repository = Platform.Aggregates.Reducers.Definitions.Repository();
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
	await repository.create(definition);
	await t.notThrows(async () => await repository.delete(definition))
});

test('The repository does not return the definition once it has been deleted', async t => {
	let repository = Platform.Aggregates.Reducers.Definitions.Repository();
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
	await repository.delete(definition)
	let fetchedDefinition = await repository.get(definition.id)
	t.deepEqual(fetchedDefinition, [])
});