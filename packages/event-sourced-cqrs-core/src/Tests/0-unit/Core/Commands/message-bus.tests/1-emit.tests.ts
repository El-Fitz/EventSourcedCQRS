// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-26 16:26:03 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 16:47:19
//  */

import { TestFn } from 'ava';

import { Platform } from "../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';
import { Commands } from '../../../../Factories/index.js';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let [command] = parameters?.commands?.items ?? [];
				let messageBus = platform.Commands.MessageBus;
				await t.notThrows(async () => await messageBus.emit(command))
			});
		};
		return {
			title: 'Command Emission succeeds with the proper parameters',
			expectedResult: null,
			initialState: undefined,
			parameters: {
				commands: { items: [Commands.Commands()] }
			},
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let [command] = parameters?.commands?.items ?? [];
				let messageBus = platform.Commands.MessageBus;
				let result = await messageBus.emit(command);
				t.is(result, (() => { })());
			});
		};
		return {
			title: 'Command Emission returns void on success',
			expectedResult: null,
			initialState: undefined,
			parameters: {
				commands: { items: [Commands.Commands()] }
			},
			implementation,
		};
	})(),
];
