/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:02:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:31:44
 */

import * as Basic from "./0-basics.tests"
import * as Create from "./1-create.tests"
import * as Get from "./2-get.tests"
import * as Delete from "./3-delete.tests"

export { Basic, Create, Get, Delete };

export const TestSuites = [
	...Basic.testSuites,
	...Create.testSuites,
	...Get.testSuites,
	...Delete.testSuites,
].map((testSuite) => ({
	...testSuite,
	title: `[REPOSITORIES REPOSITORY] - ${testSuite.title}`
}));;