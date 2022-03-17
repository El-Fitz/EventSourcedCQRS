/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 14:06:09
 */

import { TestInterface } from 'ava';
import { Platform } from "../../../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../../Domain';
import * as Factories from '../../../../../../Factories/index.js';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Querying the service will not throw when there are no definitions';
		const initialState = undefined;
		const commandsParameters = {
			items: [Factories.Commands.Commands()]
		};
		const parameters = {
			commands: commandsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Commands.Reducers.Definitions.Service;
				const [command] = parameters?.commands?.items ?? [];
				await t.notThrows(async () => await service.query(command))
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
		const title = 'Querying the service will return an empty array when there are no definitions';
		const initialState = undefined;
		const parameters = {
			commands: {
				items: [Factories.Commands.Commands()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Commands.Reducers.Definitions.Service;
				const [command] = parameters?.commands?.items ?? [];
				let fetchedDefinitions = await service.query(command)
				t.deepEqual(fetchedDefinitions, expectedResult);
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
	(() => {
		const title = 'Querying the service will return an empty array when no definitions match the event';
		const initialState = undefined;
		const parameters = {
			commands: {
				items: [Factories.Commands.Commands()],
				reducersDefinitions: [Factories.Commands.Reducers.Definitions()]
			},
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Commands.Reducers.Definitions.Service;
				const [definition] = parameters?.commands?.reducersDefinitions ?? [];
				const [command] = parameters?.commands?.items ?? [];
				await service.create(definition);
				let fetchedDefinitions = await service.query(command)
				t.deepEqual(fetchedDefinitions, expectedResult);
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
	(() => {
		const title = 'Querying the service will return a definition when one matches the event';
		const initialState = undefined;
		const commandsItemsParameters = [Factories.Commands.Commands()];
		const commandsParameters = {
			items: commandsItemsParameters,
			reducersDefinitions: commandsItemsParameters.map(( { id }) => Factories.Commands.Reducers.Definitions({ triggeringCommandId: id }))
		}
		const parameters = {
			commands: commandsParameters
		};
		const expectedResults = commandsParameters.reducersDefinitions;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Commands.Reducers.Definitions.Service;
				const [definition] = parameters?.commands?.reducersDefinitions ?? [];
				const [command] = parameters?.commands?.items ?? [];
				await service.create(definition);
				let fetchedDefinitions = await service.query(command)
				t.deepEqual(fetchedDefinitions, expectedResult);
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
		const title = 'Querying the service will only return the definition matching the event';
		const initialState = undefined;
		const commandsItemsParameters = [Factories.Commands.Commands()];
		const expectedResults = commandsItemsParameters.map(( { id }) => Factories.Commands.Reducers.Definitions({ triggeringCommandId: id }));
		const commandsParameters = {
			items: commandsItemsParameters,
			reducersDefinitions: [
				...expectedResults,
				Factories.Commands.Reducers.Definitions(),
				Factories.Commands.Reducers.Definitions(),
				Factories.Commands.Reducers.Definitions(),
				Factories.Commands.Reducers.Definitions(),
			]
		}
		const parameters = {
			commands: commandsParameters,
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Commands.Reducers.Definitions.Service;
				const [definition] = parameters?.commands?.reducersDefinitions ?? [];
				const [command] = parameters?.commands?.items ?? [];
				await service.create(definition);
				let fetchedDefinitions = await service.query(command)
				t.deepEqual(fetchedDefinitions, expectedResult);
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
		const title = 'Querying the service will return every definition matching the event';
		const initialState = undefined;
		const commandsItemsParameters = [Factories.Commands.Commands()];
		const expectedResults = [
			...commandsItemsParameters.map(( { id }) => Factories.Commands.Reducers.Definitions({ triggeringCommandId: id })),
			...commandsItemsParameters.map(( { id }) => Factories.Commands.Reducers.Definitions({ triggeringCommandId: id })),
			...commandsItemsParameters.map(( { id }) => Factories.Commands.Reducers.Definitions({ triggeringCommandId: id })),
			...commandsItemsParameters.map(( { id }) => Factories.Commands.Reducers.Definitions({ triggeringCommandId: id })),
			...commandsItemsParameters.map(( { id }) => Factories.Commands.Reducers.Definitions({ triggeringCommandId: id }))
		];
		const commandsParameters = {
			items: commandsItemsParameters,
			reducersDefinitions: [
				...expectedResults,
				Factories.Commands.Reducers.Definitions(),
				Factories.Commands.Reducers.Definitions(),
				Factories.Commands.Reducers.Definitions(),
				Factories.Commands.Reducers.Definitions(),
			]
		}
		const parameters = {
			commands: commandsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Commands.Reducers.Definitions.Service;
				const reducersDefinitions = parameters?.commands?.reducersDefinitions ?? [];
				const [command] = parameters?.commands?.items ?? [];
				await Promise.all(reducersDefinitions.map(service.create));
				let fetchedDefinitions = await service.query(command)
				t.deepEqual(fetchedDefinitions, expectedResult);
			});
		};
		return {
			title,
			expectedResult: expectedResults as TestSuiteExpectedResult,
			initialState,
			parameters,
			implementation,
		};
	})(),
];
