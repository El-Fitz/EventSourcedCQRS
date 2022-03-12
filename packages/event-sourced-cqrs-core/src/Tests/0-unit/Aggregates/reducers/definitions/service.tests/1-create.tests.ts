/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 14:32:32
 */

import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import * as Core from "../../../../../../index.js";
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Reducers - Definitions - Service - Reducers Definitions Creation succeeds with proper parameter', async t => {
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
		await t.notThrows(async () => await service.create(definition));
	});
	
	test('Agggregates - Reducers - Definitions - Service - Reducers Definitions is returned after creation', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service;
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
	
		let createdReducerDefinition = 	await service.create(definition)
		t.deepEqual(createdReducerDefinition, definition)
	});	
}
