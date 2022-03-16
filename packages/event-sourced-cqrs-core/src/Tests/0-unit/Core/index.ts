/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 13:06:52 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 13:07:44
 */

export * as Aggregates from "./Aggregates";
export * as Commands from "./Commands";
export * as Projections from "./Projections";

import * as Aggregates from "./Aggregates";
import * as Commands from "./Commands";
import * as Projections from './Projections';

export const TestSuites = [
	...Aggregates.TestSuites,
	...Commands.TestSuites,
	...Projections.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[CORE] - ${testSuite.title}`
}));;