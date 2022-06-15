/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 13:05:37 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 13:48:08
 */

import * as MessageBus from "./message-bus.tests";
import * as Reducers from './Reducers';

export { MessageBus, Reducers };

export const TestSuites = [
	...MessageBus.TestSuites,
	...Reducers.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[COMMANDS] - ${testSuite.title}`
}));;
