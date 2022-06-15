/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:16:07
*/

import { TestFn } from 'ava';

import { Platform } from "../../../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Succesfully initializes Reducers Definitions Service';
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.Events.Reducers.Definitions.Service;
				t.not(service, undefined);
			});
		};
		return {
			title,
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
	(() => {
		const title = 'Reducers Definitions Service has the proper methods';
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.Events.Reducers.Definitions.Service;
				t.not(service.create, undefined);
				t.not(service.get, undefined);
				t.not(service.query, undefined);
				t.not(service.delete, undefined);
			});
		};
		return {
			title,
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
];
