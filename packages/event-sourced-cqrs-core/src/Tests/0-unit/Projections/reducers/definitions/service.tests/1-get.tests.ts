/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 00:47:04
 */


import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import * as Core from "../../../../../../index.js";
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Reducer Definition can be retrieved after creation', async t => {
		let service = platform.Projections.Reducers.Definitions.Service
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
			triggeringEventId: uuid(),
			requiredAggregates: [],
			reducer: () => Promise.resolve(reducer),
		}
		// await service.create(definition);
		await t.notThrows(async () => await service.get(definition.id))
	});
	
	test('The service returns the expected reducer definition', async t => {
		let service = platform.Projections.Reducers.Definitions.Service
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
			triggeringEventId: uuid(),
			requiredAggregates: [],
			reducer: () => Promise.resolve(reducer),
		}
		// await service.create(definition)
		let fetchedDefinition = await service.get(definition.id)
		t.deepEqual(fetchedDefinition, [definition])
	});
	
	test('The service returns an empty array when the requested reducer definition does not exist', async t => {
		let service = platform.Projections.Reducers.Definitions.Service
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
		let fetchedDefinition = await service.get(uuid())
		t.deepEqual(fetchedDefinition, [])
	});
}
