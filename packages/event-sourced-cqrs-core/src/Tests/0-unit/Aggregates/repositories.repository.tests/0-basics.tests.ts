/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:03:07
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../index.js";
import { TestSuiteParameters, TestSuiteExpectedResult } from '../../../Domain/index.js';

export default (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Repositories Repository - Succesfully initializes Aggregates Repositories Repository', t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		t.not(repository, undefined);
	});
	
	test('Agggregates - Repositories Repository - Aggregates Repositories Repository has the proper methods', t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		t.not(repository.create, undefined);
		t.not(repository.get, undefined);
		t.not(repository.delete, undefined);
	});
}
