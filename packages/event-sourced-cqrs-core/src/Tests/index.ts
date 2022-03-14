/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:00:03 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:23:16
 */

import { TestInterface } from 'ava';
import * as Core from "../index.js";

export * as Unit from "./0-unit"

import * as Unit from "./0-unit"

export const TestSuites = [
	...Unit.TestSuites,
]

export const RunnableTests = 
	TestSuites.map((testSuite) =>
	(platform: Core.PlatformInterface) =>
	(test: TestInterface<unknown>) => testSuite.implementation(testSuite.title)(testSuite.parameters)(testSuite.expectedResult)(platform)(test));

export const TestRunner = 
	(platform: Core.PlatformInterface) => 
	(test: TestInterface) => 
	RunnableTests.map((testSuite) => testSuite(platform)(test));