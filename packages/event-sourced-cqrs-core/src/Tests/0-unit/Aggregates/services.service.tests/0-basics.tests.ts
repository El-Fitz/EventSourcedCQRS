/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:30:29
 */

import { TestInterface } from 'ava';

import * as Core from "../../../../Core/index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let service = platform.Aggregates.ServicesService;
				t.not(service, undefined);
			});
		};
		return {
			title: 'Succesfully initializes Aggregates Services Service',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let service = platform.Aggregates.ServicesService;
				t.not(service.create, undefined);
				t.not(service.get, undefined);
				t.not(service.delete, undefined);
			});
		};
		return {
			title: 'Aggregates Services Service has the proper methods',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
];