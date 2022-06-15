/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 14:07:47
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
			events: {
				reducersDefinitions: [Factories.Events.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Events.Reducers.Definitions.Service;
				const [definition] = parameters?.events?.reducersDefinitions ?? [];
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
			events: {
				reducersDefinitions: [Factories.Events.Reducers.Definitions()]
			}
		};
		const expectedResults = parameters?.events.reducersDefinitions[0];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Events.Reducers.Definitions.Service;
				const [definition] = parameters?.events?.reducersDefinitions ?? [];
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
		const title = 'The service returns null when the requested reducer definition does not exist';
		const initialState = undefined;
		const parameters = {
			events: {
				reducersDefinitions: [Factories.Events.Reducers.Definitions()]
			}
		};
		const implementation = (title: string) => (_parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Events.Reducers.Definitions.Service;
				let fetchedDefinition = await service.get(uuid())
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
