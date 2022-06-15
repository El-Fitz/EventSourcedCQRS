/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:06:37 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:28:08
 */

import * as Repository from "./repository.tests";
import * as Service from "./service.tests";


export { Repository, Service };

export const TestSuites = [
	...Repository.TestSuites,
	...Service.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[DEFINITIONS] - ${testSuite.title}`
}));