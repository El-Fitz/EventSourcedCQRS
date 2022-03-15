/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 14:29:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:34:35
 */

export * as Aggregates from "./Core/Aggregates";
export * as Projections from "./Core/Projections";

import * as Aggregates from "./Core/Aggregates";
import * as Projections from './Core/Projections';

export const TestSuites = [
	...Aggregates.TestSuites,
	...Projections.TestSuites
];
