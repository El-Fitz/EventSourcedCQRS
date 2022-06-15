/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 14:08:05
 */

import { v4 as uuid } from "uuid";

import { TestFn } from 'ava';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../../Domain';
import { Platform } from "../../../../../../../index.js";
import * as Factories from '../../../../../../Factories/index.js';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducer Definition can be retrieved after creation';
		const initialState = undefined;
		const parameters = {
			commands: {
				reducersDefinitions: [Factories.Commands.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Commands.Reducers.Definitions.Repository;
				const [definition] = parameters?.commands?.reducersDefinitions ?? [];
				await repository.create(definition);
				await t.notThrows(async () => await repository.get(definition.id))
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
		const title = 'The repository returns the expected reducer definition';
		const initialState = undefined;
		const parameters = {
			commands: {
				reducersDefinitions: [Factories.Commands.Reducers.Definitions()]
			}
		};
		const expectedResults = parameters?.commands.reducersDefinitions[0];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Commands.Reducers.Definitions.Repository;
				const [definition] = parameters?.commands?.reducersDefinitions ?? [];
				await repository.create(definition);
				let fetchedDefinition = await repository.get(definition.id)
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
		const title = 'The repository returns null when the requested reducer definition does not exist';
		const initialState = undefined;
		const parameters = {
			commands: {
				reducersDefinitions: [Factories.Commands.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Commands.Reducers.Definitions.Repository;
				let fetchedDefinition = await repository.get(uuid())
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
