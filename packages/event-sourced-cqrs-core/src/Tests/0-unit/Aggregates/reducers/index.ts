/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:13:27 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:48:15
 */

export * as Definitions from './definitions';
import * as Definitions from './definitions';

import { TestInterface } from 'ava';

import * as Core from "../../../../index.js";
import { TestSuiteExpectedResult, TestSuiteParameters } from '../../../Domain';

const TestSuites = [
	...Definitions.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[AGGREGATES] - [REDUCERS] - ${testSuite.title}`
}));

export const RunTests = 
	TestSuites.map((testSuite) => (_parameters?: TestSuiteParameters) =>
	(_expectedResult?: TestSuiteExpectedResult) =>
	(platform: Core.PlatformInterface) =>
	(test: TestInterface<unknown>) => testSuite.implementation(testSuite.title)(testSuite.parameters)(testSuite.expectedResult)(platform)(test));