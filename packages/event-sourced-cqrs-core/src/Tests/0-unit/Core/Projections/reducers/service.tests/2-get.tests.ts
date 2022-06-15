/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 11:08:41
 */

import { v4 as uuid } from "uuid";

import { TestFn } from 'ava';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';
import { Platform } from "../../../../../../index.js";
import * as Factories from '../../../../../Factories/index.js';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducer can be retrieved after creation';
		const initialState = undefined;
		const parameters = {
			projections: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Projections.Reducers.Reducers()
				}]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Service;
				const [{ id, reducer }] = parameters?.projections?.reducers ?? [];
				const definition = Factories.Projections.Reducers.Definitions({ reducerId: id });
				await service.create(id, reducer);
				await t.notThrows(async () => await service.get(definition))
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
		const title = 'The service returns the expected reducer';
		const initialState = undefined;
		const parameters = {
			projections: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Projections.Reducers.Reducers()
				}]
			}
		};
		const expectedResults = parameters?.projections.reducers[0].reducer;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Service;
				const [{ id, reducer }] = parameters?.projections?.reducers ?? [];
				const definition = Factories.Projections.Reducers.Definitions({ reducerId: id });
				await service.create(id, reducer);
				let fetchedDefinition = await service.get(definition)
				t.deepEqual(fetchedDefinition, expectedResult)
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
		const title = 'The service throws an error when the requested reducer does not exist';
		const initialState = undefined;
		const parameters = {
			projections: {
				reducers: [{
					id: uuid(),
					reducer: Factories.Projections.Reducers.Reducers()
				}]
			}
		};
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Service;
				const definition = Factories.Projections.Reducers.Definitions();
				await t.throwsAsync(async () => service.get(definition));
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
];
