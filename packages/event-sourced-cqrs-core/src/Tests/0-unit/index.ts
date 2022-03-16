/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 14:29:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 13:08:46
 */

export * as Core from "./Core";
import * as Core from "./Core";

export const TestSuites = [
	...Core.TestSuites,
].map((testSuite) => ({
	...testSuite,
	title: `[UNIT] - ${testSuite.title}`
}));;
