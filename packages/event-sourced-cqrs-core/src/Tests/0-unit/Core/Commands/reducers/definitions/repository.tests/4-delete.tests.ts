/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 14:04:04
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
			commands: {
				reducersDefinitions: [Factories.Commands.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Commands.Reducers.Definitions.Repository;
				const [definition] = parameters?.commands?.reducersDefinitions ?? [];
				await repository.create(definition);
				await t.notThrows(async () => repository.delete(definition.id));
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
		const title = 'The repository does not return the definition once it has been deleted';
		const initialState = undefined;
		const parameters = {
			commands: {
				reducersDefinitions: [Factories.Commands.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Commands.Reducers.Definitions.Repository;
				const [definition] = parameters?.commands?.reducersDefinitions ?? [];
				await repository.create(definition);
				await repository.delete(definition.id);
				let fetchedDefinition = await repository.get(definition.id)
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
