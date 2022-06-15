/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 14:52:36
 */

import { TestFn } from 'ava';
import { v4 as uuid } from 'uuid';

import { Platform } from "../../../../../../index.js";
import * as Factories from '../../../../../Factories/index.js';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducers Creation succeeds with proper parameter';
		const initialState = undefined;
		const parameters = {
			events: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Events.Reducers.Reducers()
				}]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.Events.Reducers.Service;
				const [{ id, reducer }] = parameters?.events?.reducers ?? [];
				await t.notThrows(async () => service.create(id, reducer));
			});
		};
		return {
			title,
			expectedResult: null,
			initialState,
			parameters,
			implementation,
		};
	})(),
	(() => {
		const title = 'Reducer is returned after creation';
		const initialState = undefined;
		const parameters = {
			events: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Events.Reducers.Reducers()
				}]
			}
		};
		const expectedResults = parameters?.events.reducers[0].reducer;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Events.Reducers.Service;
				const [{ id, reducer }] = parameters?.events?.reducers ?? [];
				const createdReducer = await service.create(id, reducer);
				t.deepEqual(createdReducer, expectedResult)
			});
		};
		return {
			title,
			expectedResult: expectedResults,
			initialState,
			parameters,
			implementation,
		};
	})(),
];
