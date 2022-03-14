/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:06:37 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:45:45
 */

export * as Repository from './repository.tests'
export * as Service from "./service.tests"

import { TestSuite } from '../../../../Domain';
import * as Repository from "./repository.tests"
import * as Service from "./service.tests"

export const TestSuites = [
	...Repository.TestSuites,
	...Service.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[DEFINITIONS] - ${testSuite.title}`
})).map((testSuite: TestSuite) => {
	console.log('Title: ', testSuite.title);
	return testSuite;
});