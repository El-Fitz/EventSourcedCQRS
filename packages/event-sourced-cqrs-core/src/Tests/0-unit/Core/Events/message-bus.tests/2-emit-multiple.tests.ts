/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 13:26:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 13:54:55
 */


import { TestInterface } from 'ava';

import { Platform } from "../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';
import { Events } from '../../../../Factories/index.js';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let events = parameters?.events?.items ?? [];
				let messageBus = platform.Events.MessageBus;
				await t.notThrows(async () => await messageBus.emitMultiple(events))
			});
		};
		return {
			title: 'Multiple Event Emission succeeds with the proper parameters',
			expectedResult: null,
			initialState: undefined,
			parameters: {
				events: { items: [
					Events.Events(),
					Events.Events(),
					Events.Events(),
					Events.Events(),
					Events.Events(),
				]}
			},
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let events = parameters?.events?.items ?? [];
				let messageBus = platform.Events.MessageBus;
				let result = await messageBus.emitMultiple(events)
				t.is(result, (() => { })());
			});
		};
		return {
			title: 'Multiple Event Emission returns void on success',
			expectedResult: null,
			initialState: undefined,
			parameters: {
				events: { items: [
					Events.Events(),
					Events.Events(),
					Events.Events(),
					Events.Events(),
					Events.Events(),
				]}
			},
			implementation,
		};
	})(),
];
