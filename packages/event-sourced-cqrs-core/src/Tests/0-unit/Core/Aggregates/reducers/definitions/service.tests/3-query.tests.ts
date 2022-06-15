/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:16:37
 */

import { TestFn } from 'ava';
import { Platform } from "../../../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../../Domain';
import * as Factories from '../../../../../../Factories/index.js';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Querying the service will not throw when there are no definitions';
		const initialState = undefined;
		const eventsParameters = {
			items: [Factories.Events.Events()]
		};
		const parameters = {
			events: eventsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Aggregates.Reducers.Definitions.Service;
				const [event] = parameters?.events?.items ?? [];
				await t.notThrows(async () => await service.query(event))
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
			events: {
				items: [Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Aggregates.Reducers.Definitions.Service;
				const [event] = parameters?.events?.items ?? [];
				let fetchedDefinitions = await service.query(event)
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
			aggregates: {
				reducersDefinitions: [Factories.Aggregates.Reducers.Definitions()]
			},
			events: {
				items: [Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Aggregates.Reducers.Definitions.Service;
				const [definition] = parameters?.aggregates?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await service.create(definition);
				let fetchedDefinitions = await service.query(event)
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
		const eventsParameters = {
			items: [Factories.Events.Events()]
		};
		const aggregatesParameters = {
			reducersDefinitions: eventsParameters.items.map(( { id }) => Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id }))
		}
		const parameters = {
			aggregates: aggregatesParameters,
			events: eventsParameters
		};
		const expectedResults = aggregatesParameters.reducersDefinitions;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Aggregates.Reducers.Definitions.Service;
				const [definition] = parameters?.aggregates?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await service.create(definition);
				let fetchedDefinitions = await service.query(event)
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
		const eventsParameters = {
			items: [Factories.Events.Events()]
		};
		const expectedResults = eventsParameters.items.map(( { id }) => Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id }));
		const aggregatesParameters = {
			reducersDefinitions: [
				...expectedResults,
				Factories.Aggregates.Reducers.Definitions(),
				Factories.Aggregates.Reducers.Definitions(),
				Factories.Aggregates.Reducers.Definitions(),
				Factories.Aggregates.Reducers.Definitions(),
			]
		}
		const parameters = {
			aggregates: aggregatesParameters,
			events: eventsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Aggregates.Reducers.Definitions.Service;
				const [definition] = parameters?.aggregates?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await service.create(definition);
				let fetchedDefinitions = await service.query(event)
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
		const eventsParameters = {
			items: [Factories.Events.Events()]
		};
		const expectedResults = [
			...eventsParameters.items.map(( { id }) => Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id })),
			...eventsParameters.items.map(( { id }) => Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id })),
			...eventsParameters.items.map(( { id }) => Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id })),
			...eventsParameters.items.map(( { id }) => Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id })),
			...eventsParameters.items.map(( { id }) => Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id }))
		];
		const aggregatesParameters = {
			reducersDefinitions: [
				...expectedResults,
				Factories.Aggregates.Reducers.Definitions(),
				Factories.Aggregates.Reducers.Definitions(),
				Factories.Aggregates.Reducers.Definitions(),
				Factories.Aggregates.Reducers.Definitions(),
			]
		}
		const parameters = {
			aggregates: aggregatesParameters,
			events: eventsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Aggregates.Reducers.Definitions.Service;
				const reducersDefinitions = parameters?.aggregates?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await Promise.all(reducersDefinitions.map(service.create));
				let fetchedDefinitions = await service.query(event)
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
