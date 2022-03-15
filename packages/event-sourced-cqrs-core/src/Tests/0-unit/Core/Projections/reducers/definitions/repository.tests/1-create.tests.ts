/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:18:34
 */

import { TestInterface } from 'ava';

import { Platform } from "../../../../../../../index.js";
import * as Factories from '../../../../../../Factories/index.js';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducers Definitions Creation succeeds with proper parameter';
		const initialState = undefined;
		const parameters = {
			projections: {
				reducersDefinitions: [Factories.Projections.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Projections.Reducers.Definitions.Repository;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
				await t.notThrows(async () => repository.create(definition));
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
		const parameters = {
			projections: {
				reducersDefinitions: [Factories.Projections.Reducers.Definitions()]
			}
		};
		const expectedResults = parameters?.projections.reducersDefinitions[0];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const repository = platform.Projections.Reducers.Definitions.Repository;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
				await repository.create(definition);
				const createdReducerDefinition = 	await repository.create(definition)
				t.deepEqual(createdReducerDefinition, expectedResult)
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
