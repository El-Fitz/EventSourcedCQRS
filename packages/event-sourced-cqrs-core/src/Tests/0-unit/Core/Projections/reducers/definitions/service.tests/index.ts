/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:02:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:41:43
 */

import * as Basic from "./0-basics.tests"
import * as Create from './1-create.tests';
import * as Get from "./2-get.tests"
import * as Query from "./3-query.tests"
import * as Delete from "./4-delete.tests";

export const TestSuites = [
	...Basic.testSuites,
	...Create.testSuites,
	...Get.testSuites,
	...Query.testSuites,
	...Delete.testSuites,
].map((testSuite) => ({
	...testSuite,
	title: `[SERVICE] - ${testSuite.title}`
}));