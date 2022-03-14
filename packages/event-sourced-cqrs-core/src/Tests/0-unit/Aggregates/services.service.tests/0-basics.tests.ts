/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:03:40
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../index.js";
import { TestSuiteParameters, TestSuiteExpectedResult } from '../../../Domain/index.js';

export default (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Services Service - Succesfully initializes Aggregates Services Service', t => {
		let service = platform.Aggregates.ServicesService;
		t.not(service, undefined);
	});
	
	test('Agggregates - Services Service - Aggregates Services Service has the proper methods', t => {
		let service = platform.Aggregates.ServicesService;
		t.not(service.create, undefined);
		t.not(service.get, undefined);
		t.not(service.delete, undefined);
	});
}
