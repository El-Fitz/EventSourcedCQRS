/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:24:47
 */

import { TestFn } from 'ava';

import { Platform } from "../../../../";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let repository = platform.RepositoriesRepository;
				t.not(repository, undefined);
			});
		};
		return {
			title: 'Succesfully initializes Projections Repositories Repository',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let repository = platform.RepositoriesRepository;
				t.not(repository.create, undefined);
				t.not(repository.get, undefined);
				t.not(repository.delete, undefined);
			});
		};
		return {
			title: 'Projections Repositories Repository has the proper methods',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
];