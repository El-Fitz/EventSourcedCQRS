/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:42:17
 */

import { v4 as uuid } from "uuid";

import { TestInterface } from 'ava';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';
import * as Core from "../../../../../../Core/index.js";
import * as Factories from '../../../../../Factories/index.js';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducer Definition can be retrieved after creation';
		const initialState = undefined;
		const parameters = {
			projections: {
				reducersDefinitions: [Factories.Projections.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Definitions.Service;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
				await service.create(definition);
				await t.notThrows(async () => await service.get(definition.id))
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
		const title = 'The service returns the expected reducer definition';
		const initialState = undefined;
		const parameters = {
			projections: {
				reducersDefinitions: [Factories.Projections.Reducers.Definitions()]
			}
		};
		const expectedResults = parameters?.projections.reducersDefinitions;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Definitions.Service;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
				await service.create(definition);
				let fetchedDefinition = await service.get(definition.id)
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
		const title = 'The service returns an empty array when the requested reducer definition does not exist';
		const initialState = undefined;
		const parameters = {
			projections: {
				reducersDefinitions: [Factories.Projections.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Definitions.Service;
				let fetchedDefinition = await service.get(uuid())
				t.deepEqual(fetchedDefinition, expectedResult)
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
