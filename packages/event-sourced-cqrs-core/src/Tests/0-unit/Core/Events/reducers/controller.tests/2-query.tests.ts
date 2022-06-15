/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 18:02:12 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 13:58:57
 */

import { TestFn } from 'ava';
import { v4 as uuid } from 'uuid';

import { Core, Platform } from "../../../../../../index.js";
import * as Factories from '../../../../../Factories/index.js';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducers Definitions Query succeeds with proper parameter';
		const initialState = undefined;
		const parameters = {
			events: {
				items: [Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Events.Reducers.Controller;
				const [event] = parameters?.events?.items ?? [];
				await t.notThrowsAsync(async () => controller.query(event));
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
			events: {
				items: [Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Events.Reducers.Controller;
				const [event] = parameters?.events?.items ?? [];
				const result = await controller.query(event);
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
		const title = 'Querying the controller will return an empty array when no definitions match the event';
		const initialState = undefined;
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Events.Reducers.Reducers() }];
		const parameters = {
			events: {
				items: [Factories.Events.Events()],
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.reduce((acc: Core.Events.Reducers.Definitions.Definition[], { id }) => acc.concat([
					Factories.Events.Reducers.Definitions({ reducerId: id }),
					Factories.Events.Reducers.Definitions({ reducerId: id })
				]), [])
			},
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Events.Reducers.Controller;
				const reducersRepository = platform.Events.Reducers.Repository;
				const [{ id, reducer }] = parameters?.events?.reducers ?? [];
				const definitions = parameters?.events?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await reducersRepository.create(id, reducer);
				await Promise.all(
					definitions.map(controller.createDefinition)
				);
				const result = await controller.query(event);
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
		const title = 'Querying the controller will return a reducer when a definition matches the event';
		const initialState = undefined;
		const event = Factories.Events.Events();
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Events.Reducers.Reducers() }];
		const parameters = {
			events: {
				items: [event],
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.map(({ id }) => Factories.Events.Reducers.Definitions({ reducerId: id, triggeringEventId: event.id })),
			}
		};
		const expectedResults = [{
			definition: parameters?.events.reducersDefinitions[0],
			reducer: parameters?.events.reducers[0].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Events.Reducers.Controller;
				const reducersRepository = platform.Events.Reducers.Repository;
				const [{ id, reducer }] = parameters?.events?.reducers ?? [];
				const definitions = parameters?.events?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await reducersRepository.create(id, reducer);
				await Promise.all(
					definitions.map(controller.createDefinition)
				);
				const result = await controller.query(event);
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
		const title = 'Querying the controller will only return the reducer matching the definition matching the event';
		const initialState = undefined;
		const event = Factories.Events.Events();
		const parametersReducers =  [
			{ id: uuid(), reducer: Factories.Events.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Events.Reducers.Reducers() }
		];
		const parameters = {
			events: {
				items: [event],
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Events.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Events.Reducers.Definitions({ reducerId: parametersReducers[1].id })
				]
			}
		};
		const expectedResults = [{
			definition: parameters?.events.reducersDefinitions[0],
			reducer: parameters?.events.reducers[0].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Events.Reducers.Controller;
				const reducersRepository = platform.Events.Reducers.Repository;
				const reducers = parameters?.events?.reducers ?? [];
				const definitions = parameters?.events?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await Promise.all(
					reducers.map(({ id, reducer }) => reducersRepository.create(id, reducer))
				);
				await Promise.all(
					definitions.map(controller.createDefinition)
				);
				const result = await controller.query(event);
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
		const title = 'Querying the repository will return each reducer matching each definition matching the event';
		const initialState = undefined;
		const event = Factories.Events.Events();
		const parametersReducers =  [
			{ id: uuid(), reducer: Factories.Events.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Events.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Events.Reducers.Reducers() }
		];
		const parameters = {
			events: {
				items: [event],
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Events.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Events.Reducers.Definitions({ reducerId: parametersReducers[1].id, triggeringEventId: event.id }),
					Factories.Events.Reducers.Definitions({ reducerId: parametersReducers[2].id }),
				]
			}
		};
		const expectedResults = [{
			definition: parameters?.events.reducersDefinitions[0],
			reducer: parameters?.events.reducers[0].reducer
		}, {
			definition: parameters?.events.reducersDefinitions[1],
			reducer: parameters?.events.reducers[1].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Events.Reducers.Controller;
				const reducersRepository = platform.Events.Reducers.Repository;
				const reducers = parameters?.events?.reducers ?? [];
				const definitions = parameters?.events?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await Promise.all(
					reducers.map(({ id, reducer }) => reducersRepository.create(id, reducer))
				);
				await Promise.all(
					definitions.map(controller.createDefinition)
				);
				const result = await controller.query(event);
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
		const title = 'Querying the repository will return a single instance of each reducer matching each definition matching the event (the controller will deduplicate reducers based on defintions reducerIds)';
		const initialState = undefined;
		const event = Factories.Events.Events();
		const parametersReducers =  [
			{ id: uuid(), reducer: Factories.Events.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Events.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Events.Reducers.Reducers() }
		];
		const parameters = {
			events: {
				items: [event],
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Events.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Events.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Events.Reducers.Definitions({ reducerId: parametersReducers[2].id, triggeringEventId: event.id }),
				]
			}
		};
		const expectedResults = [{
			definition: parameters?.events.reducersDefinitions[0],
			reducer: parameters?.events.reducers[0].reducer
		}, {
			definition: parameters?.events.reducersDefinitions[2],
			reducer: parameters?.events.reducers[2].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Events.Reducers.Controller;
				const reducersRepository = platform.Events.Reducers.Repository;
				const reducers = parameters?.events?.reducers ?? [];
				const definitions = parameters?.events?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await Promise.all(
					reducers.map(({ id, reducer }) => reducersRepository.create(id, reducer))
				);
				await Promise.all(
					definitions.map(controller.createDefinition)
				);
				const result = await controller.query(event);
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
