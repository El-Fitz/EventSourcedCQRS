/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:02:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 14:48:29
 */

import * as Basic from "./0-basics.tests"
import * as Create from './1-create.tests';
import * as Get from "./2-get.tests"

export { Basic, Create, Get };

export const TestSuites = [
	...Basic.testSuites,
	...Create.testSuites,
	...Get.testSuites,
].map((testSuite) => ({
	...testSuite,
	title: `[SERVICE] - ${testSuite.title}`
}));