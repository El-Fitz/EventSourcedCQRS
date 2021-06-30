/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:10:11
 */

import { TestInterface } from 'ava';

import * as Core from "../../../../index.js";
import { PlatformInterface } from "../../../../index.js";
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Services Service - Aggregates Service can be deleted after creation', async t => {
		let service = platform.Aggregates.ServicesService;
		let aggregatesRepository = aggregateRepositoryFactory();
		let aggregatesService = Core.Aggregates.Service(aggregatesRepository);
		await service.create(aggregatesRepository);
		await t.notThrows(async () => await service.delete(aggregatesService.repositoryId))
	});
	
	test('Agggregates - Services Service - The service does not return the Aggregates Service once it has been deleted', async t => {
		let service = platform.Aggregates.ServicesService;
		let aggregatesRepository = aggregateRepositoryFactory();
		let aggregatesService = Core.Aggregates.Service(aggregatesRepository);
		await service.create(aggregatesRepository);
		await service.delete(aggregatesService.repositoryId)
		let fetchedAggregatesService = await service.get(aggregatesService.repositoryId)
		t.deepEqual(fetchedAggregatesService, null)
	});
}
