/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 18:02:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 18:04:37
 */

import * as Basic from "./0-basics.tests"
import * as Create from './1-create-definition.tests';
import * as Get from "./2-query.tests"

export const TestSuites = [
	...Basic.testSuites,
	...Create.testSuites,
	...Get.testSuites,
].map((testSuite) => ({
	...testSuite,
	title: `[CONTROLLER] - ${testSuite.title}`
}));