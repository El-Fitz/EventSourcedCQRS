/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:05:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:40:47
 */

import test from 'ava';
import { PlatformTestConfig } from "./Domain";
import { Platform } from '../';
import * as Unit from "./0-unit"

const TestSuites = [
	...Unit.TestSuites,
];

export const TestController = async <T>(platformConfig: PlatformTestConfig<T>): Promise<void> => Promise.all(TestSuites.map(async (testSuite) => {
	const platform = platformConfig.factory(platformConfig.parameters)
	await Platform.Setup.PlatformSetupController(platform)(testSuite.initialState)
	return testSuite.implementation(testSuite.title)(testSuite.parameters)(testSuite.expectedResult)(platform)(test) 
})).then(() => { })