/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:03:24
*/

import { TestInterface } from 'ava';

import { PlatformInterface } from "../../../../index.js";
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";
import { TestSuiteParameters, TestSuiteExpectedResult } from '../../../Domain/index.js';

export default (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Repositories Repository - Aggregates Repository Creation succeeds with proper parameter', async t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		let aggregatesRepository = aggregateRepositoryFactory();
		await t.notThrows(async () => await repository.create(aggregatesRepository));
	});
	
	test('Agggregates - Repositories Repository - Aggregates Repository is returned after creation', async t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		let aggregatesRepository = aggregateRepositoryFactory();
		let createdAggregatesRepository = await repository.create(aggregatesRepository)
		t.deepEqual(createdAggregatesRepository, aggregatesRepository)
	});
}
