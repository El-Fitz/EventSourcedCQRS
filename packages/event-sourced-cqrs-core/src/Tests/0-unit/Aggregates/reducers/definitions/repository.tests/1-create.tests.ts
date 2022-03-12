/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 16:00:56
 */

import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";

import * as Core from "../../../../../../index.js";
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Reducers - Definitions - Repository - Reducers Definitions Creation succeeds with proper parameter', async t => {
		let repository = platform.Aggregates.Reducers.Definitions.Repository;
		let definition: Core.Aggregates.Reducers.Definitions.Definition = {
			id: uuid(),
			triggeringEventId: uuid(),
			requiredAggregates: [],
		}
		await t.notThrows(async () => await repository.create(definition));
	});
	
	test('Agggregates - Reducers - Definitions - Repository - Reducers Definitions is returned after creation', async t => {
		let repository = platform.Aggregates.Reducers.Definitions.Repository;
		let definition: Core.Aggregates.Reducers.Definitions.Definition = {
			id: uuid(),
			triggeringEventId: uuid(),
			requiredAggregates: [],
		}
	
		let createdReducerDefinition = 	await repository.create(definition)
		t.deepEqual(createdReducerDefinition, definition)
	});
}
