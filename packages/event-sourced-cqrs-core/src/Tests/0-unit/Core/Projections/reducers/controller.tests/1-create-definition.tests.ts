/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 18:02:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 11:06:53
 */

import { TestFn } from 'ava';
import { v4 as uuid } from 'uuid';

import { Core, Platform } from "../../../../../../index.js";
import * as Factories from '../../../../../Factories/index.js';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducers Definitions Creation succeeds with proper parameter';
		const initialState = undefined;
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Projections.Reducers.Reducers() }];
		const parameters = {
			projections: {
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.reduce((acc: Core.Projections.Reducers.Definitions.Definition[], { id }) => acc.concat([
					Factories.Projections.Reducers.Definitions({ reducerId: id }),
					Factories.Projections.Reducers.Definitions({ reducerId: id })
				]), [])
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Projections.Reducers.Controller;
				const reducersRepository = platform.Projections.Reducers.Repository;
				const [{ id, reducer }] = parameters?.projections?.reducers ?? [];
				const definitions = parameters?.projections?.reducersDefinitions ?? [];
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
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Projections.Reducers.Reducers() }];
		const parameters = {
			projections: {
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.reduce((acc: Core.Projections.Reducers.Definitions.Definition[], { id }) => acc.concat([
					Factories.Projections.Reducers.Definitions({ reducerId: id }),
					Factories.Projections.Reducers.Definitions({ reducerId: id })
				]), [])
			}
		};
		const expectedResults = parameters?.projections.reducersDefinitions;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Projections.Reducers.Controller;
				const reducersRepository = platform.Projections.Reducers.Repository;
				const [{ id, reducer }] = parameters?.projections?.reducers ?? [];
				const definitions = parameters?.projections?.reducersDefinitions ?? [];
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
