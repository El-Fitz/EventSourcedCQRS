/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 18:02:12 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 13:58:57
 */

import { TestInterface } from 'ava';
import { v4 as uuid } from 'uuid';

import { Core, Platform } from "../../../../../../index.js";
import * as Factories from '../../../../../Factories/index.js';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducers Definitions Query succeeds with proper parameter';
		const initialState = undefined;
		const parameters = {
			commands: {
				items: [Factories.Commands.Commands()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Commands.Reducers.Controller;
				const [command] = parameters?.commands?.items ?? [];
				await t.notThrowsAsync(async () => controller.query(command));
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
		const title = 'Querying the controller will return an empty array when there are no definitions';
		const initialState = undefined;
		const parameters = {
			commands: {
				items: [Factories.Commands.Commands()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Commands.Reducers.Controller;
				const [command] = parameters?.commands?.items ?? [];
				const result = await controller.query(command);
				t.deepEqual(result, expectedResult)
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
		const title = 'Querying the controller will return an empty array when no definitions match the command';
		const initialState = undefined;
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Commands.Reducers.Reducers() }];
		const parameters = {
			commands: {
				items: [Factories.Commands.Commands()],
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.reduce((acc: Core.Commands.Reducers.Definitions.Definition[], { id }) => acc.concat([
					Factories.Commands.Reducers.Definitions({ reducerId: id }),
					Factories.Commands.Reducers.Definitions({ reducerId: id })
				]), [])
			},
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Commands.Reducers.Controller;
				const reducersRepository = platform.Commands.Reducers.Repository;
				const [{ id, reducer }] = parameters?.commands?.reducers ?? [];
				const definitions = parameters?.commands?.reducersDefinitions ?? [];
				const [command] = parameters?.commands?.items ?? [];
				await reducersRepository.create(id, reducer);
				await Promise.all(
					definitions.map(controller.createDefinition)
				);
				const result = await controller.query(command);
				t.deepEqual(result, expectedResult);
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
		const title = 'Querying the controller will return a reducer when a definition matches the command';
		const initialState = undefined;
		const command = Factories.Commands.Commands();
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Commands.Reducers.Reducers() }];
		const parameters = {
			commands: {
				items: [command],
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.map(({ id }) => Factories.Commands.Reducers.Definitions({ reducerId: id, triggeringCommandId: command.id })),
			}
		};
		const expectedResults = [{
			definition: parameters?.commands.reducersDefinitions[0],
			reducer: parameters?.commands.reducers[0].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Commands.Reducers.Controller;
				const reducersRepository = platform.Commands.Reducers.Repository;
				const [{ id, reducer }] = parameters?.commands?.reducers ?? [];
				const definitions = parameters?.commands?.reducersDefinitions ?? [];
				const [command] = parameters?.commands?.items ?? [];
				await reducersRepository.create(id, reducer);
				await Promise.all(
					definitions.map(controller.createDefinition)
				);
				const result = await controller.query(command);
				t.deepEqual(result, expectedResult);
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
		const title = 'Querying the controller will only return the reducer matching the definition matching the command';
		const initialState = undefined;
		const command = Factories.Commands.Commands();
		const parametersReducers =  [
			{ id: uuid(), reducer: Factories.Commands.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Commands.Reducers.Reducers() }
		];
		const parameters = {
			commands: {
				items: [command],
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Commands.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringCommandId: command.id }),
					Factories.Commands.Reducers.Definitions({ reducerId: parametersReducers[1].id })
				]
			}
		};
		const expectedResults = [{
			definition: parameters?.commands.reducersDefinitions[0],
			reducer: parameters?.commands.reducers[0].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Commands.Reducers.Controller;
				const reducersRepository = platform.Commands.Reducers.Repository;
				const reducers = parameters?.commands?.reducers ?? [];
				const definitions = parameters?.commands?.reducersDefinitions ?? [];
				const [command] = parameters?.commands?.items ?? [];
				await Promise.all(
					reducers.map(({ id, reducer }) => reducersRepository.create(id, reducer))
				);
				await Promise.all(
					definitions.map(controller.createDefinition)
				);
				const result = await controller.query(command);
				t.deepEqual(result, expectedResult);
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
		const title = 'Querying the repository will return each reducer matching each definition matching the command';
		const initialState = undefined;
		const command = Factories.Commands.Commands();
		const parametersReducers =  [
			{ id: uuid(), reducer: Factories.Commands.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Commands.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Commands.Reducers.Reducers() }
		];
		const parameters = {
			commands: {
				items: [command],
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Commands.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringCommandId: command.id }),
					Factories.Commands.Reducers.Definitions({ reducerId: parametersReducers[1].id, triggeringCommandId: command.id }),
					Factories.Commands.Reducers.Definitions({ reducerId: parametersReducers[2].id }),
				]
			}
		};
		const expectedResults = [{
			definition: parameters?.commands.reducersDefinitions[0],
			reducer: parameters?.commands.reducers[0].reducer
		}, {
			definition: parameters?.commands.reducersDefinitions[1],
			reducer: parameters?.commands.reducers[1].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Commands.Reducers.Controller;
				const reducersRepository = platform.Commands.Reducers.Repository;
				const reducers = parameters?.commands?.reducers ?? [];
				const definitions = parameters?.commands?.reducersDefinitions ?? [];
				const [command] = parameters?.commands?.items ?? [];
				await Promise.all(
					reducers.map(({ id, reducer }) => reducersRepository.create(id, reducer))
				);
				await Promise.all(
					definitions.map(controller.createDefinition)
				);
				const result = await controller.query(command);
				t.deepEqual(result, expectedResult);
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
		const title = 'Querying the repository will return a single instance of each reducer matching each definition matching the command (the controller will deduplicate reducers based on defintions reducerIds)';
		const initialState = undefined;
		const command = Factories.Commands.Commands();
		const parametersReducers =  [
			{ id: uuid(), reducer: Factories.Commands.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Commands.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Commands.Reducers.Reducers() }
		];
		const parameters = {
			commands: {
				items: [command],
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Commands.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringCommandId: command.id }),
					Factories.Commands.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringCommandId: command.id }),
					Factories.Commands.Reducers.Definitions({ reducerId: parametersReducers[2].id, triggeringCommandId: command.id }),
				]
			}
		};
		const expectedResults = [{
			definition: parameters?.commands.reducersDefinitions[0],
			reducer: parameters?.commands.reducers[0].reducer
		}, {
			definition: parameters?.commands.reducersDefinitions[2],
			reducer: parameters?.commands.reducers[2].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Commands.Reducers.Controller;
				const reducersRepository = platform.Commands.Reducers.Repository;
				const reducers = parameters?.commands?.reducers ?? [];
				const definitions = parameters?.commands?.reducersDefinitions ?? [];
				const [command] = parameters?.commands?.items ?? [];
				await Promise.all(
					reducers.map(({ id, reducer }) => reducersRepository.create(id, reducer))
				);
				await Promise.all(
					definitions.map(controller.createDefinition)
				);
				const result = await controller.query(command);
				t.deepEqual(result, expectedResult);
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
