/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 14:04:12
 */

import { TestInterface } from 'ava';

import { Platform } from "../../../../../../../index.js";
import * as Factories from '../../../../../../Factories/index.js';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducer Definition can be deleted after creation';
		const initialState = undefined;
		const parameters = {
			events: {
				reducersDefinitions: [Factories.Events.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let service = platform.Events.Reducers.Definitions.Service;
				const [definition] = parameters?.events?.reducersDefinitions ?? [];
				await service.create(definition);
				await t.notThrows(async () => service.delete(definition.id));
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
		const title = 'The service does not return the definition once it has been deleted';
		const initialState = undefined;
		const parameters = {
			events: {
				reducersDefinitions: [Factories.Events.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let service = platform.Events.Reducers.Definitions.Service;
				const [definition] = parameters?.events?.reducersDefinitions ?? [];
				await service.create(definition);
				await service.delete(definition.id);
				let fetchedDefinition = await service.get(definition.id)
				t.deepEqual(fetchedDefinition, expectedResult)
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
