/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 17:58:35
 */

import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import * as Core from "../../../../../../index.js";
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Reducers - Definitions - Service - Querying the service will not throw when there are no definitions', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service
		let event: Core.Events.Event = {
			id: uuid(),
			creationDate: DateTime.now(),
			instanceId: uuid(),
			tracingId: uuid(),
			version: "1.0.0",
			name: "name",
			body:  { }
		}
		await t.notThrows(async () => await service.query(event))
	});
	
	test('Agggregates - Reducers - Definitions - Service - Querying the service will return an empty array when there are no definitions', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service
		let event: Core.Events.Event = {
			id: uuid(),
			creationDate: DateTime.now(),
			instanceId: uuid(),
			tracingId: uuid(),
			version: "1.0.0",
			name: "name",
			body:  { }
		}
		let fetchedDefinitions = await service.query(event)
		t.deepEqual(fetchedDefinitions, [])
	});
	
	test('Agggregates - Reducers - Definitions - Service - Querying the service will return an empty array when no definitions match the event', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service
		let event: Core.Events.Event = {
			id: uuid(),
			creationDate: DateTime.now(),
			instanceId: uuid(),
			tracingId: uuid(),
			version: "1.0.0",
			name: "name",
			body:  { }
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
		await service.create(definition)
		let fetchedDefinition = await service.query(event)
		t.deepEqual(fetchedDefinition, [])
	});
	
	test('Agggregates - Reducers - Definitions - Service - Querying the service will return a definition when one matches the event', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service
		let event: Core.Events.Event = {
			id: uuid(),
			creationDate: DateTime.now(),
			instanceId: uuid(),
			tracingId: uuid(),
			version: "1.0.0",
			name: "name",
			body:  { }
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
		await service.create(definition)
		let fetchedDefinition = await service.query(event)
		t.deepEqual(fetchedDefinition, [definition])
	});
	
	test('Agggregates - Reducers - Definitions - Service - Querying the service will only return the definition matching the event', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service
		let event: Core.Events.Event = {
			id: uuid(),
			creationDate: DateTime.now(),
			instanceId: uuid(),
			tracingId: uuid(),
			version: "1.0.0",
			name: "name",
			body:  { }
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
			service.create(matchingDefinition),
			service.create(nonMatchingDefinition),
		])
		let fetchedDefinition = await service.query(event)
		t.deepEqual(fetchedDefinition, [matchingDefinition])
	});
	
	
	test('Agggregates - Reducers - Definitions - Service - Querying the service will return every definition matching the event', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service
		let event: Core.Events.Event = {
			id: uuid(),
			creationDate: DateTime.now(),
			instanceId: uuid(),
			tracingId: uuid(),
			version: "1.0.0",
			name: "name",
			body:  { }
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
			service.create(firstMatchingDefinition),
			service.create(secondMatchingDefinition),
			service.create(nonMatchingDefinition),
		])
		let fetchedDefinition = await service.query(event)
		t.deepEqual(fetchedDefinition, [firstMatchingDefinition, secondMatchingDefinition])
	});
}
