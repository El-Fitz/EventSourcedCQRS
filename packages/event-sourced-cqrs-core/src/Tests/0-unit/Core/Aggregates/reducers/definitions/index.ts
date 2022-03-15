/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:06:37 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:28:08
 */

export * as Repository from './repository.tests'
export * as Service from "./service.tests"

import * as Repository from "./repository.tests"
import * as Service from "./service.tests"

export const TestSuites = [
	...Repository.TestSuites,
	...Service.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[DEFINITIONS] - ${testSuite.title}`
}));