/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:29:31
 */

import { TestFn } from 'ava';

import { Platform } from "../../../../";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.ServicesService;
				t.not(service, undefined);
			});
		};
		return {
			title: 'Succesfully initializes Projections Services Service',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.ServicesService;
				t.not(service.create, undefined);
				t.not(service.get, undefined);
				t.not(service.delete, undefined);
			});
		};
		return {
			title: 'Projections Services Service has the proper methods',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
];