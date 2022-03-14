/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:02:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:31:36
 */

import * as Basic from "./0-basics.tests"
import * as Create from "./1-create.tests"
import * as Get from "./2-get.tests"
import * as Delete from "./3-delete.tests"

export const TestSuites = [
	...Basic.testSuites,
	...Create.testSuites,
	...Get.testSuites,
	...Delete.testSuites,
].map((testSuite) => ({
	...testSuite,
	title: `[SERVICES SERVICE] - ${testSuite.title}`
}));;