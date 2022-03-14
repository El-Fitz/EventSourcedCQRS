/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 00:47:10
 */

import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import * as Core from "../../../../../../index.js";
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Querying the service will not throw when there are no definitions', async t => {
		let service = platform.Projections.Reducers.Definitions.Service
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
	
	test('Querying the service will return an empty array when there are no definitions', async t => {
		let service = platform.Projections.Reducers.Definitions.Service
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
	
	test('Querying the service will return an empty array when no definitions match the event', async t => {
		let service = platform.Projections.Reducers.Definitions.Service
		let event: Core.Events.Event = {
			id: uuid(),
			creationDate: DateTime.now(),
			instanceId: uuid(),
			tracingId: uuid(),
			version: "1.0.0",
			name: "name",
			body:  { }
		}
		// let reducer: Core.Projections.Reducers.Reducer = (event: Core.Events.Event) => (_projections: Core.Projections.Projection[]) => {
		// 	return {
		// 		id: uuid(),
		// 		tracingId: event.tracingId,
		// 		creationDate: DateTime.now(),
		// 		updatedAt: null,
		// 		repositoryId: uuid(),
		// 		versionNumber: "1.0.0",
		// 		value: event.body,
		// 	}
		// }
		// let definition: Core.Projections.Reducers.Definitions.Definition = {
		// 	id: uuid(),
		// 	triggeringEventId: uuid(),
		// 	requiredAggregates: [],
		// 	reducer: () => Promise.resolve(reducer),
		// }
		// await service.create(definition)
		let fetchedDefinition = await service.query(event)
		t.deepEqual(fetchedDefinition, [])
	});
	
	test('Querying the service will return a definition when one matches the event', async t => {
		let service = platform.Projections.Reducers.Definitions.Service
		let event: Core.Events.Event = {
			id: uuid(),
			creationDate: DateTime.now(),
			instanceId: uuid(),
			tracingId: uuid(),
			version: "1.0.0",
			name: "name",
			body:  { }
		}
		let reducer: Core.Projections.Reducers.Reducer = (event: Core.Events.Event) => (_projections: Core.Projections.Projection[]) => {
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
		let definition: Core.Projections.Reducers.Definitions.Definition = {
			id: uuid(),
			triggeringEventId: event.id,
			requiredAggregates: [],
			reducer: () => Promise.resolve(reducer),
		}
		// await service.create(definition)
		let fetchedDefinition = await service.query(event)
		t.deepEqual(fetchedDefinition, [definition])
	});
	
	test('Querying the service will only return the definition matching the event', async t => {
		let service = platform.Projections.Reducers.Definitions.Service
		let event: Core.Events.Event = {
			id: uuid(),
			creationDate: DateTime.now(),
			instanceId: uuid(),
			tracingId: uuid(),
			version: "1.0.0",
			name: "name",
			body:  { }
		}
		let reducer: Core.Projections.Reducers.Reducer = (event: Core.Events.Event) => (_projections: Core.Projections.Projection[]) => {
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
		let matchingDefinition: Core.Projections.Reducers.Definitions.Definition = {
			id: uuid(),
			triggeringEventId: event.id,
			requiredAggregates: [],
			reducer: () => Promise.resolve(reducer),
		}
		// let nonMatchingDefinition: Core.Projections.Reducers.Definitions.Definition = {
		// 	id: uuid(),
		// 	triggeringEventId: uuid(),
		// 	requiredAggregates: [],
		// 	reducer: () => Promise.resolve(reducer),
		// }
		// await Promise.all([
		// 	service.create(matchingDefinition),
		// 	service.create(nonMatchingDefinition),
		// ])
		let fetchedDefinition = await service.query(event)
		t.deepEqual(fetchedDefinition, [matchingDefinition])
	});
	
	
	test('Querying the service will return every definition matching the event', async t => {
		let service = platform.Projections.Reducers.Definitions.Service
		let event: Core.Events.Event = {
			id: uuid(),
			creationDate: DateTime.now(),
			instanceId: uuid(),
			tracingId: uuid(),
			version: "1.0.0",
			name: "name",
			body:  { }
		}
		let reducer: Core.Projections.Reducers.Reducer = (event: Core.Events.Event) => (_projections: Core.Projections.Projection[]) => {
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
		let firstMatchingDefinition: Core.Projections.Reducers.Definitions.Definition = {
			id: uuid(),
			triggeringEventId: event.id,
			requiredAggregates: [],
			reducer: () => Promise.resolve(reducer),
		}
		let secondMatchingDefinition: Core.Projections.Reducers.Definitions.Definition = {
			id: uuid(),
			triggeringEventId: event.id,
			requiredAggregates: [],
			reducer: () => Promise.resolve(reducer),
		}
		// let nonMatchingDefinition: Core.Projections.Reducers.Definitions.Definition = {
		// 	id: uuid(),
		// 	triggeringEventId: uuid(),
		// 	requiredAggregates: [],
		// 	reducer: () => Promise.resolve(reducer),
		// }
		// await Promise.all([
		// 	service.create(firstMatchingDefinition),
		// 	service.create(secondMatchingDefinition),
		// 	service.create(nonMatchingDefinition),
		// ])
		let fetchedDefinition = await service.query(event)
		t.deepEqual(fetchedDefinition, [firstMatchingDefinition, secondMatchingDefinition])
	});
}
