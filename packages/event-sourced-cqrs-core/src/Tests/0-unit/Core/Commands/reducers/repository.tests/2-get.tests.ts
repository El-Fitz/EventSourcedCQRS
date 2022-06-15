/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 15:47:43
 */

import { v4 as uuid } from "uuid";

import { TestFn } from 'ava';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';
import { Core, Platform } from "../../../../../../index.js";
import { Factories } from '../../../../..';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducer can be retrieved after creation';
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
				const repository = platform.Commands.Reducers.Repository;
				const [{ id, reducer }] = parameters?.commands?.reducers ?? [];
				const definition = Factories.Commands.Reducers.Definitions({ reducerId: id });
				await repository.create(id, reducer);
				await t.notThrows(async () => await repository.get(definition))
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
		const title = 'The repository returns the expected reducer';
		const initialState = undefined;
		const parameters = {
			commands: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Commands.Reducers.Reducers()
				}]
			}
		};
		const expectedResults = parameters?.commands.reducers[0].reducer as Core.Commands.Reducers.Reducer;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Commands.Reducers.Repository;
				const [{ id, reducer }] = parameters?.commands?.reducers ?? [];
				const definition = Factories.Commands.Reducers.Definitions({ reducerId: id });
				await repository.create(id, reducer);
				const fetchedReducer = await repository.get(definition);
				t.deepEqual(fetchedReducer, expectedResult)
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
	(() => {
		const title = 'The repository throws an error when the requested reducer does not exist';
		const initialState = undefined;
		const parameters = {
			commands: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Commands.Reducers.Reducers()
				}]
			}
		};
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Commands.Reducers.Repository;
				const definition = Factories.Commands.Reducers.Definitions();
				await t.throwsAsync(async () => repository.get(definition));
			});
		};
		return {
			title,
			expectedResult: [],
			initialState,
			parameters,
			implementation,
		};
	})(),
];
