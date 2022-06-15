/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 18:02:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 15:09:50
 */

import * as Basic from "./0-basics.tests"
import * as Create from './1-create-definition.tests';
import * as Query from "./2-query.tests"

export { Basic, Create, Query };

export const TestSuites = [
	...Basic.testSuites,
	...Create.testSuites,
	...Query.testSuites,
].map((testSuite) => ({
	...testSuite,
	title: `[CONTROLLER] - ${testSuite.title}`
}));