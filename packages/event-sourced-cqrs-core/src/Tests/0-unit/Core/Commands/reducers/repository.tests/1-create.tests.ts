/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 15:43:47
 */

import { TestFn } from 'ava';
import { v4 as uuid } from 'uuid';

import { Platform } from "../../../../../../index.js";
import * as Factories from '../../../../../Factories';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducers Creation succeeds with proper parameter';
		const initialState = undefined;
		const parameters = {
			commands: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Commands.Reducers.Reducers()
				}]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let repository = platform.Commands.Reducers.Repository;
				const [{ id, reducer }] = parameters?.commands?.reducers ?? [];
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
			commands: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Commands.Reducers.Reducers()
				}]
			}
		};
		const expectedResults = parameters?.commands.reducers[0].reducer;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Commands.Reducers.Repository;
				const [{ id, reducer }] = parameters?.commands?.reducers ?? [];
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
