/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:00:03 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:17:00
 */

import { TestInterface } from 'ava';

export * as Unit from "./0-unit"

import * as Unit from "./0-unit"
import { PlatformInterface } from "../"
import { TestSuiteExpectedResult, TestSuiteParameters } from './Domain';

export const TestSuites = [
	...Unit.TestSuites,
]

export const RunTests = 
	(parameters?: TestSuiteParameters) =>
	(expectedResult?: TestSuiteExpectedResult) => 
	(platform: PlatformInterface) => 
	(test: TestInterface) => 
	TestSuites.map((testSuite) => testSuite(parameters)(expectedResult)(platform)(test));