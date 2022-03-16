/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 18:02:12 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 18:49:33
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
			events: {
				items: [Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Aggregates.Reducers.Controller;
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Aggregates.Reducers.Controller;
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
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() }];
		const parameters = {
			aggregates: {
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.reduce((acc: Core.Aggregates.Reducers.Definitions.Definition[], { id }) => acc.concat([
					Factories.Aggregates.Reducers.Definitions({ reducerId: id }),
					Factories.Aggregates.Reducers.Definitions({ reducerId: id })
				]), [])
			},
			events: {
				items: [Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Aggregates.Reducers.Controller;
				const reducersRepository = platform.Aggregates.Reducers.Repository;
				const [{ id, reducer }] = parameters?.aggregates?.reducers ?? [];
				const definitions = parameters?.aggregates?.reducersDefinitions ?? [];
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
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() }];
		const parameters = {
			aggregates: {
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.map(({ id }) => Factories.Aggregates.Reducers.Definitions({ reducerId: id, triggeringEventId: event.id })),
			},
			events: {
				items: [event]
			}
		};
		const expectedResults = [{
			definition: parameters?.aggregates.reducersDefinitions[0],
			reducer: parameters?.aggregates.reducers[0].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Aggregates.Reducers.Controller;
				const reducersRepository = platform.Aggregates.Reducers.Repository;
				const [{ id, reducer }] = parameters?.aggregates?.reducers ?? [];
				const definitions = parameters?.aggregates?.reducersDefinitions ?? [];
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
			{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() }
		];
		const parameters = {
			aggregates: {
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Aggregates.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Aggregates.Reducers.Definitions({ reducerId: parametersReducers[1].id })
				]
			},
			events: {
				items: [event]
			}
		};
		const expectedResults = [{
			definition: parameters?.aggregates.reducersDefinitions[0],
			reducer: parameters?.aggregates.reducers[0].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Aggregates.Reducers.Controller;
				const reducersRepository = platform.Aggregates.Reducers.Repository;
				const reducers = parameters?.aggregates?.reducers ?? [];
				const definitions = parameters?.aggregates?.reducersDefinitions ?? [];
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
			{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() }
		];
		const parameters = {
			aggregates: {
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Aggregates.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Aggregates.Reducers.Definitions({ reducerId: parametersReducers[1].id, triggeringEventId: event.id }),
					Factories.Aggregates.Reducers.Definitions({ reducerId: parametersReducers[2].id }),
				]
			},
			events: {
				items: [event]
			}
		};
		const expectedResults = [{
			definition: parameters?.aggregates.reducersDefinitions[0],
			reducer: parameters?.aggregates.reducers[0].reducer
		}, {
			definition: parameters?.aggregates.reducersDefinitions[1],
			reducer: parameters?.aggregates.reducers[1].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Aggregates.Reducers.Controller;
				const reducersRepository = platform.Aggregates.Reducers.Repository;
				const reducers = parameters?.aggregates?.reducers ?? [];
				const definitions = parameters?.aggregates?.reducersDefinitions ?? [];
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
			{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Aggregates.Reducers.Reducers() }
		];
		const parameters = {
			aggregates: {
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Aggregates.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Aggregates.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Aggregates.Reducers.Definitions({ reducerId: parametersReducers[2].id, triggeringEventId: event.id }),
				]
			},
			events: {
				items: [event]
			}
		};
		const expectedResults = [{
			definition: parameters?.aggregates.reducersDefinitions[0],
			reducer: parameters?.aggregates.reducers[0].reducer
		}, {
			definition: parameters?.aggregates.reducersDefinitions[2],
			reducer: parameters?.aggregates.reducers[2].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const controller = platform.Aggregates.Reducers.Controller;
				const reducersRepository = platform.Aggregates.Reducers.Repository;
				const reducers = parameters?.aggregates?.reducers ?? [];
				const definitions = parameters?.aggregates?.reducersDefinitions ?? [];
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
