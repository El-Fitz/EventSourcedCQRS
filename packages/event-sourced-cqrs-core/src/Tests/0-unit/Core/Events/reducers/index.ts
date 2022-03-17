/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:13:27 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 18:33:28
 */

export * as Controller from './controller.tests';
export * as Definitions from './Definitions';
export * as Repository from './repository.tests'
export * as Service from './service.tests';

import * as Controller from './controller.tests';
import * as Definitions from './Definitions';
import * as Repository from './repository.tests'
import * as Service from './service.tests';

export const TestSuites = [
	...Controller.TestSuites,
	...Definitions.TestSuites,
	...Repository.TestSuites,
	...Service.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[REDUCERS] - ${testSuite.title}`
}));