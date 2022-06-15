/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 14:47:41
*/

import { TestFn } from 'ava';

import { Platform } from "../../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.Aggregates.Reducers.Service;
				t.not(service, undefined);
			});
		};
		return {
			title: 'Succesfully initializes Reducers Service',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.Aggregates.Reducers.Service;
				t.not(service.create, undefined);
				t.not(service.get, undefined);
			});
		};
		return {
			title: 'Reducers Service has the proper methods',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
];