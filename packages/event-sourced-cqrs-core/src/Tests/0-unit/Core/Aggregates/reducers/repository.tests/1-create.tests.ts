/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 15:43:47
 */

import { TestInterface } from 'ava';
import { v4 as uuid } from 'uuid';

import { Platform } from "../../../../../../index.js";
import * as Factories from '../../../../../Factories';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducers Creation succeeds with proper parameter';
		const initialState = undefined;
		const parameters = {
			aggregates: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Aggregates.Reducers.Reducers()
				}]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Aggregates.Reducers.Repository;
				const [{ id, reducer }] = parameters?.aggregates?.reducers ?? [];
				await t.notThrows(async () => repository.create(id, reducer));
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
			aggregates: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Aggregates.Reducers.Reducers()
				}]
			}
		};
		const expectedResults = parameters?.aggregates.reducers[0].reducer;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const repository = platform.Aggregates.Reducers.Repository;
				const [{ id, reducer }] = parameters?.aggregates?.reducers ?? [];
				const createdReducer = await repository.create(id, reducer);
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
