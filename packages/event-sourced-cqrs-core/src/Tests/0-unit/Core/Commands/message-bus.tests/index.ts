/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 12:49:49 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 14:09:13
 */

import * as Basic from "./0-basics.tests"
import * as Emit from './1-emit.tests';
import * as EmitMultiple from "./2-emit-multiple.tests"

export const TestSuites = [
	...Basic.testSuites,
	...Emit.testSuites,
	...EmitMultiple.testSuites,
].map((testSuite) => ({
	...testSuite,
	title: `[MESSAGE BUS] - ${testSuite.title}`
}));