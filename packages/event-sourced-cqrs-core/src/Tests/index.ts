/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:00:03 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 14:30:34
 */

import { TestInterface } from 'ava';

export * as Unit from "./0-unit"

import * as Unit from "./0-unit"
import { PlatformInterface } from "../"

export const TestSuites = [
	...Unit.TestSuites,
]

export const RunTests = 
	(platform: PlatformInterface) => 
		(test: TestInterface) => 
			TestSuites.map((testSuite) => testSuite(platform)(test))