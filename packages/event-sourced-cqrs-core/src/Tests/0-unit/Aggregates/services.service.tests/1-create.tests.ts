/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:03:45
 */

import { TestInterface } from 'ava';

import * as Core from "../../../../index.js";
import { PlatformInterface } from "../../../../index.js";
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";
import { TestSuiteParameters, TestSuiteExpectedResult } from '../../../Domain/index.js';

export default (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Services Service - Aggregates Service Creation succeeds with proper parameter', async t => {
		let service = platform.Aggregates.ServicesService;
		let aggregatesRepository = aggregateRepositoryFactory();
		await t.notThrows(async () => await service.create(aggregatesRepository));
	});
	
	test('Agggregates - Services Service - Aggregates Service is returned after creation', async t => {
		let service = platform.Aggregates.ServicesService;
		let aggregatesRepository = aggregateRepositoryFactory();
		let aggregatesService = Core.Aggregates.Service(aggregatesRepository);
		let createdAggregatesService = await service.create(aggregatesRepository)
		t.is(JSON.stringify(createdAggregatesService), JSON.stringify(aggregatesService));
	});
}
