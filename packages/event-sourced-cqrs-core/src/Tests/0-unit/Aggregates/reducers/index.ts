/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:13:27 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:33:58
 */

export * as Definitions from './definitions';
import * as Definitions from './definitions';

export const TestSuites = [
	...Definitions.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[AGGREGATES] - ${testSuite.title}`
}));