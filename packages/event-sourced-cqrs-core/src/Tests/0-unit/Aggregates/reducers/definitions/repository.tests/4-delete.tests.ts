/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 16:01:01
 */

import { v4 as uuid } from "uuid";

import { TestInterface } from 'ava';
import * as Core from "../../../../../../index.js";
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Reducers - Definitions - Repository - Reducer Definition can be deleted after creation', async t => {
		let repository = platform.Aggregates.Reducers.Definitions.Repository;
		let definition: Core.Aggregates.Reducers.Definitions.Definition = {
			id: uuid(),
			triggeringEventId: uuid(),
			requiredAggregates: []
		}
		await repository.create(definition);
		await t.notThrows(async () => await repository.delete(definition.id))
	});
	
	test('Agggregates - Reducers - Definitions - Repository - The repository does not return the definition once it has been deleted', async t => {
		let repository = platform.Aggregates.Reducers.Definitions.Repository;
		let definition: Core.Aggregates.Reducers.Definitions.Definition = {
			id: uuid(),
			triggeringEventId: uuid(),
			requiredAggregates: []
		}
		await repository.create(definition)
		await repository.delete(definition.id)
		let fetchedDefinition = await repository.get(definition.id)
		t.deepEqual(fetchedDefinition, [])
	});
}
