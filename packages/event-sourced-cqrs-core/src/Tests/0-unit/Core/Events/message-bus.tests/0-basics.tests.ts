// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-26 16:22:08 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 16:25:03
//  */


import { TestInterface } from 'ava';

import { Platform } from "../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let messageBus = platform.Events.MessageBus;
				t.not(messageBus, undefined);
			});
		};
		return {
			title: 'Succesfully initializes Message Bus',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let messageBus = platform.Events.MessageBus;
				t.not(messageBus.emit, undefined);
				t.not(messageBus.emitMultiple, undefined);
			});
		};
		return {
			title: 'Message Bus has the proper methods',
			expectedResult: null,
			initialState: undefined,
			parameters: undefined,
			implementation,
		};
	})(),
];