/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:10:56
 */


import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import * as Core from "../../../../../../index.js";
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Reducers - Definitions - Service - Reducer Definition can be deleted after creation', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service
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
			triggeringEventId: uuid(),
			requiredAggregates: [],
			reducer: () => Promise.resolve(reducer),
		}
		await service.create(definition);
		await t.notThrows(async () => await service.delete(definition.id))
	});
	
	test('Agggregates - Reducers - Definitions - Service - The service does not return the definition once it has been deleted', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service
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
			triggeringEventId: uuid(),
			requiredAggregates: [],
			reducer: () => Promise.resolve(reducer),
		}
		await service.create(definition)
		await service.delete(definition.id)
		let fetchedDefinition = await service.get(definition.id)
		t.deepEqual(fetchedDefinition, [])
	});
}
