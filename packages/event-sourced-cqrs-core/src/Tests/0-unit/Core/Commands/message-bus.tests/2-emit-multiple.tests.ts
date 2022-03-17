/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 13:26:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 13:54:55
 */


import { TestInterface } from 'ava';

import { Platform } from "../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';
import { Commands } from '../../../../Factories/index.js';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let commands = parameters?.commands?.items ?? [];
				let messageBus = platform.Commands.MessageBus;
				await t.notThrows(async () => await messageBus.emitMultiple(commands))
			});
		};
		return {
			title: 'Multiple Command Emission succeeds with the proper parameters',
			expectedResult: null,
			initialState: undefined,
			parameters: {
				commands: { items: [
					Commands.Commands(),
					Commands.Commands(),
					Commands.Commands(),
					Commands.Commands(),
					Commands.Commands(),
				]}
			},
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let commands = parameters?.commands?.items ?? [];
				let messageBus = platform.Commands.MessageBus;
				let result = await messageBus.emitMultiple(commands)
				t.is(result, (() => { })());
			});
		};
		return {
			title: 'Multiple Command Emission returns void on success',
			expectedResult: null,
			initialState: undefined,
			parameters: {
				commands: { items: [
					Commands.Commands(),
					Commands.Commands(),
					Commands.Commands(),
					Commands.Commands(),
					Commands.Commands(),
				]}
			},
			implementation,
		};
	})(),
];
