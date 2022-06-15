/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:13:27 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 11:07:39
 */

import * as Controller from './controller.tests';
import * as Definitions from './Definitions';
import * as Repository from './repository.tests'
import * as Service from './service.tests';

export { Controller, Definitions, Repository, Service };

export const TestSuites = [
	...Controller.TestSuites,
	...Definitions.TestSuites,
	...Repository.TestSuites,
	...Service.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[REDUCERS] - ${testSuite.title}`
}));