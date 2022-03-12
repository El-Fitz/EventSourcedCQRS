/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 16:01:19
 */


import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";

import * as Core from "../../../../../../index.js";
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Reducers - Definitions - Service - Reducer Definition can be deleted after creation', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service;
		let definition: Core.Aggregates.Reducers.Definitions.Definition = {
			id: uuid(),
			triggeringEventId: uuid(),
			requiredAggregates: [],
		}
		await service.create(definition);
		await t.notThrows(async () => await service.delete(definition.id))
	});
	
	test('Agggregates - Reducers - Definitions - Service - The service does not return the definition once it has been deleted', async t => {
		let service = platform.Aggregates.Reducers.Definitions.Service;
		let definition: Core.Aggregates.Reducers.Definitions.Definition = {
			id: uuid(),
			triggeringEventId: uuid(),
			requiredAggregates: [],
		}
		await service.create(definition)
		await service.delete(definition.id)
		let fetchedDefinition = await service.get(definition.id)
		t.deepEqual(fetchedDefinition, [])
	});
}
