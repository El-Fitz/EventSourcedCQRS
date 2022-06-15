/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 18:02:36 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 11:06:49
 */

import { TestFn } from 'ava';

import { Platform } from "../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Reducers.Controller;
				t.not(controller, undefined);
			});
		};
		return {
			title: 'Succesfully initializes Reducers Controller',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Reducers.Controller;
				t.not(controller.createDefinition, undefined);
				t.not(controller.query, undefined);
			});
		};
		return {
			title: 'Reducers Controller has the proper methods',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
];