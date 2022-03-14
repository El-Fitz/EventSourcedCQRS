/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 14:29:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:34:35
 */

export * as Aggregates from "./Aggregates";
export * as Projections from "./Projections";

import * as Aggregates from "./Aggregates";
import * as Projections from './Projections';

export const TestSuites = [
	...Aggregates.TestSuites,
	...Projections.TestSuites
];
