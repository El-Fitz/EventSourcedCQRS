// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-26 16:26:03 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 16:47:19
//  */

import { TestFn } from 'ava';

import { Platform } from "../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';
import { Events } from '../../../../Factories/index.js';

export const testSuites: TestSuite[] = [
	(() => {
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let [event] = parameters?.events?.items ?? [];
				let messageBus = platform.Events.MessageBus;
				await t.notThrows(async () => await messageBus.emit(event))
			});
		};
		return {
			title: 'Event Emission succeeds with the proper parameters',
			expectedResult: null,
			initialState: undefined,
			parameters: {
				events: { items: [Events.Events()] }
			},
			implementation,
		};
	})(),
	(() => {
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let [event] = parameters?.events?.items ?? [];
				let messageBus = platform.Events.MessageBus;
				let result = await messageBus.emit(event);
				t.is(result, (() => { })());
			});
		};
		return {
			title: 'Event Emission returns void on success',
			expectedResult: null,
			initialState: undefined,
			parameters: {
				events: { items: [Events.Events()] }
			},
			implementation,
		};
	})(),
];
