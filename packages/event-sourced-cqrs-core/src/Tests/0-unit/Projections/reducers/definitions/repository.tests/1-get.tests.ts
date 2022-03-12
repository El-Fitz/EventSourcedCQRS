/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 00:44:07
 */

import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

import { TestInterface } from 'ava';
import * as Core from "../../../../../../index.js";
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Reducers - Definitions - Repository - Reducer Definition can be retrieved after creation', async t => {
		let repository = platform.Projections.Reducers.Definitions.Repository;
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
		// await repository.create(definition);
		await t.notThrows(async () => await repository.get(definition.id))
	});
	
	test('Agggregates - Reducers - Definitions - Repository - The repository returns the expected reducer definition', async t => {
		let repository = platform.Projections.Reducers.Definitions.Repository;
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
		// await repository.create(definition)
		let fetchedDefinition = await repository.get(definition.id)
		t.deepEqual(fetchedDefinition, [definition])
	});
	
	test('Agggregates - Reducers - Definitions - Repository - The repository returns an empty array when the requested reducer definition does not exist', async t => {
		let repository = platform.Projections.Reducers.Definitions.Repository;
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
		// await repository.create(definition)
		let fetchedDefinition = await repository.get(uuid())
		t.deepEqual(fetchedDefinition, [])
	});
}

