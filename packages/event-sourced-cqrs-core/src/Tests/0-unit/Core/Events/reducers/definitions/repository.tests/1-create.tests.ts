/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 18:19:58
 */

import { TestFn } from 'ava';

import { Platform } from "../../../../../../../index.js";
import * as Factories from '../../../../../../Factories/index.js';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducers Definitions Creation succeeds with proper parameter';
		const initialState = undefined;
		const parameters = {
			events: {
				reducersDefinitions: [Factories.Events.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let repository = platform.Events.Reducers.Definitions.Repository;
				const [definition] = parameters?.events?.reducersDefinitions ?? [];
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
			events: {
				reducersDefinitions: [Factories.Events.Reducers.Definitions()]
			}
		};
		const expectedResults = parameters?.events.reducersDefinitions[0];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Events.Reducers.Definitions.Repository;
				const [definition] = parameters?.events?.reducersDefinitions ?? [];
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
