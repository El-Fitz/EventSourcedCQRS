/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 18:02:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 18:18:02
 */

import { TestInterface } from 'ava';
import { v4 as uuid } from 'uuid';

import { Core, Platform } from "../../../../../../index.js";
import * as Factories from '../../../../../Factories/index.js';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducers Definitions Creation succeeds with proper parameter';
		const initialState = undefined;
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() }];
		const parameters = {
			aggregates: {
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.reduce((acc: Core.Aggregates.Reducers.Definitions.Definition[], { id }) => acc.concat([
					Factories.Aggregates.Reducers.Definitions({ reducerId: id }),
					Factories.Aggregates.Reducers.Definitions({ reducerId: id })
				]), [])
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Aggregates.Reducers.Controller;
				const reducersRepository = platform.Aggregates.Reducers.Repository;
				const [{ id, reducer }] = parameters?.aggregates?.reducers ?? [];
				const definitions = parameters?.aggregates?.reducersDefinitions ?? [];
				await reducersRepository.create(id, reducer);
				await t.notThrows(async () => Promise.all(
					definitions.map(controller.createDefinition)
				));
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
		const title = 'Reducers Definitions is returned after creation';
		const initialState = undefined;
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() }];
		const parameters = {
			aggregates: {
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.reduce((acc: Core.Aggregates.Reducers.Definitions.Definition[], { id }) => acc.concat([
					Factories.Aggregates.Reducers.Definitions({ reducerId: id }),
					Factories.Aggregates.Reducers.Definitions({ reducerId: id })
				]), [])
			}
		};
		const expectedResults = parameters?.aggregates.reducersDefinitions;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Aggregates.Reducers.Controller;
				const reducersRepository = platform.Aggregates.Reducers.Repository;
				const [{ id, reducer }] = parameters?.aggregates?.reducers ?? [];
				const definitions = parameters?.aggregates?.reducersDefinitions ?? [];
				await reducersRepository.create(id, reducer);
				const createdReducerDefinitions =	await Promise.all(
					definitions.map(controller.createDefinition)
				);
				t.deepEqual(createdReducerDefinitions, expectedResult)
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
