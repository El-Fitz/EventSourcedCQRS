/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:19:02
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
			projections: {
				reducersDefinitions: [Factories.Projections.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.Projections.Reducers.Definitions.Service;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
				await t.notThrows(async () => service.create(definition));
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Definitions.Service;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
				await service.create(definition);
				const createdReducerDefinition = 	await service.create(definition)
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
