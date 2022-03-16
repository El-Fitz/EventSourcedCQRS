/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 13:05:37 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 13:06:19
 */

import * as MessageBus from "./message-bus.tests"

export const TestSuites = [
	...MessageBus.TestSuites,
].map((testSuite) => ({
	...testSuite,
	title: `[COMMANDS] - ${testSuite.title}`
}));;
