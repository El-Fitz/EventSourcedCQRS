/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 18:05:25
 */

import { TestFn } from 'ava';

import { Platform } from "../../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let repository = platform.Commands.Reducers.Repository;
				t.not(repository, undefined);
			});
		};
		return {
			title: 'Succesfully initializes Reducers Repository',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let repository = platform.Commands.Reducers.Repository;
				t.not(repository.create, undefined);
				t.not(repository.get, undefined);
			});
		};
		return {
			title: 'Reducers Repository has the proper methods',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
];