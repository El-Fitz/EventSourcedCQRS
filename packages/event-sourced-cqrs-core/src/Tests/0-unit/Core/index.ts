/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 13:06:52 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 15:02:57
 */

import * as Aggregates from "./Aggregates";
import * as Commands from "./Commands";
import * as Events from "./Events";
import * as Projections from './Projections';

export { Aggregates, Commands, Events, Projections };

export const TestSuites = [
	...Aggregates.TestSuites,
	...Commands.TestSuites,
	...Events.TestSuites,
	...Projections.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[CORE] - ${testSuite.title}`
}));;