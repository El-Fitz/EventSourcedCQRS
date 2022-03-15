/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 19:00:17 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:22:54
 */

import { Platform } from '../../';
import { TestInterface } from 'ava';
import { TestSuiteParameters } from './testSuiteParameters.domain';
import { TestSuiteInitialState } from './testSuiteInitialState.domain';
import { TestSuiteExpectedResult } from './testSuiteExpectedResult.domain';

export interface TestSuite {
	title: String;
	expectedResult: TestSuiteExpectedResult;
	initialState?: TestSuiteInitialState;
	parameters?: TestSuiteParameters;
	implementation:
		(title: string) => 
		(parameters?: TestSuiteParameters) =>
		(expectedResult?: TestSuiteExpectedResult) =>
		(platform: Platform.PlatformInterface) =>
		(test: TestInterface<unknown>) =>
		void;
}