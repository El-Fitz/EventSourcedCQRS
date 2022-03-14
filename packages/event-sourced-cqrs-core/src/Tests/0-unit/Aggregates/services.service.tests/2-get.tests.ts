/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:03:50
 */

import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";

import * as Core from "../../../../index.js";
import { PlatformInterface } from "../../../../index.js";
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";
import { TestSuiteParameters, TestSuiteExpectedResult } from '../../../Domain/index.js';

export default (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Services Service - Aggregates Service can be retrieved after creation', async t => {
		let service = platform.Aggregates.ServicesService;
		let aggregatesRepository = aggregateRepositoryFactory();
		let aggregatesService = Core.Aggregates.Service(aggregatesRepository);
		await service.create(aggregatesRepository);
		await t.notThrows(async () => await service.get(aggregatesService.repositoryId))
	});
	
	test('Agggregates - Services Service - The service returns the expected Aggregates Service', async t => {
		let service = platform.Aggregates.ServicesService;
		let aggregatesRepository = aggregateRepositoryFactory();
		let aggregatesService = Core.Aggregates.Service(aggregatesRepository);
		await service.create(aggregatesRepository);
		let fetchedAggregatesService = await service.get(aggregatesService.repositoryId)
		t.is(JSON.stringify(fetchedAggregatesService), JSON.stringify(aggregatesService));
	});
	
	test('Agggregates - Services Service - The service returns null when the requested Aggregates Service does not exist', async t => {
		let service = platform.Aggregates.ServicesService;
		let aggregatesRepository = aggregateRepositoryFactory();
		await service.create(aggregatesRepository);
		let fetchedAggregatesService = await service.get(uuid())
		t.deepEqual(fetchedAggregatesService, null)
	});
}
