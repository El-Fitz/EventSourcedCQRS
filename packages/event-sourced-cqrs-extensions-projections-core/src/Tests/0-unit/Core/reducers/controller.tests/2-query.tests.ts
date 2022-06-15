/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 18:02:12 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:25:12
 */

import { TestFn } from 'ava';
import { v4 as uuid } from 'uuid';

import * as FrameworkCore from "event-sourced-cqrs-core";
import { Core, Platform } from "../../../../../index.js";
import * as Factories from '../../../../Factories/index.js';
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Reducers Definitions Query succeeds with proper parameter';
		const initialState = undefined;
		const parameters = {
			events: {
				items: [FrameworkCore.Tests.Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Reducers.Controller;
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
				items: [FrameworkCore.Tests.Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Reducers.Controller;
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
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Reducers.Reducers() }];
		const parameters = {
			projections: {
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.reduce((acc: Core.Reducers.Definitions.Definition[], { id }) => acc.concat([
					Factories.Reducers.Definitions({ reducerId: id }),
					Factories.Reducers.Definitions({ reducerId: id })
				]), [])
			},
			events: {
				items: [FrameworkCore.Tests.Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Reducers.Controller;
				const reducersRepository = platform.Reducers.Repository;
				const [{ id, reducer }] = parameters?.projections?.reducers ?? [];
				const definitions = parameters?.projections?.reducersDefinitions ?? [];
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
		const event = FrameworkCore.Tests.Factories.Events.Events();
		const parametersReducers =  [{ id: uuid(), reducer: Factories.Reducers.Reducers() }];
		const parameters = {
			projections: {
				reducers: parametersReducers,
				reducersDefinitions: parametersReducers.map(({ id }) => Factories.Reducers.Definitions({ reducerId: id, triggeringEventId: event.id })),
			},
			events: {
				items: [event]
			}
		};
		const expectedResults = [{
			definition: parameters?.projections.reducersDefinitions[0],
			reducer: parameters?.projections.reducers[0].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Reducers.Controller;
				const reducersRepository = platform.Reducers.Repository;
				const [{ id, reducer }] = parameters?.projections?.reducers ?? [];
				const definitions = parameters?.projections?.reducersDefinitions ?? [];
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
		const event = FrameworkCore.Tests.Factories.Events.Events();
		const parametersReducers =  [
			{ id: uuid(), reducer: Factories.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Reducers.Reducers() }
		];
		const parameters = {
			projections: {
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Reducers.Definitions({ reducerId: parametersReducers[1].id })
				]
			},
			events: {
				items: [event]
			}
		};
		const expectedResults = [{
			definition: parameters?.projections.reducersDefinitions[0],
			reducer: parameters?.projections.reducers[0].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Reducers.Controller;
				const reducersRepository = platform.Reducers.Repository;
				const reducers = parameters?.projections?.reducers ?? [];
				const definitions = parameters?.projections?.reducersDefinitions ?? [];
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
		const event = FrameworkCore.Tests.Factories.Events.Events();
		const parametersReducers =  [
			{ id: uuid(), reducer: Factories.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Reducers.Reducers() }
		];
		const parameters = {
			projections: {
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Reducers.Definitions({ reducerId: parametersReducers[1].id, triggeringEventId: event.id }),
					Factories.Reducers.Definitions({ reducerId: parametersReducers[2].id }),
				]
			},
			events: {
				items: [event]
			}
		};
		const expectedResults = [{
			definition: parameters?.projections.reducersDefinitions[0],
			reducer: parameters?.projections.reducers[0].reducer
		}, {
			definition: parameters?.projections.reducersDefinitions[1],
			reducer: parameters?.projections.reducers[1].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Reducers.Controller;
				const reducersRepository = platform.Reducers.Repository;
				const reducers = parameters?.projections?.reducers ?? [];
				const definitions = parameters?.projections?.reducersDefinitions ?? [];
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
		const event = FrameworkCore.Tests.Factories.Events.Events();
		const parametersReducers =  [
			{ id: uuid(), reducer: Factories.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Reducers.Reducers() },
			{ id: uuid(), reducer: Factories.Reducers.Reducers() }
		];
		const parameters = {
			projections: {
				reducers: parametersReducers,
				reducersDefinitions: [
					Factories.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Reducers.Definitions({ reducerId: parametersReducers[0].id, triggeringEventId: event.id }),
					Factories.Reducers.Definitions({ reducerId: parametersReducers[2].id, triggeringEventId: event.id }),
				]
			},
			events: {
				items: [event]
			}
		};
		const expectedResults = [{
			definition: parameters?.projections.reducersDefinitions[0],
			reducer: parameters?.projections.reducers[0].reducer
		}, {
			definition: parameters?.projections.reducersDefinitions[2],
			reducer: parameters?.projections.reducers[2].reducer
		}];
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const controller = platform.Reducers.Controller;
				const reducersRepository = platform.Reducers.Repository;
				const reducers = parameters?.projections?.reducers ?? [];
				const definitions = parameters?.projections?.reducersDefinitions ?? [];
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
