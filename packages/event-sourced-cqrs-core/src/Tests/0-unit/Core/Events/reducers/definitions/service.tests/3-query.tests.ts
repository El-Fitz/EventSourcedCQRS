/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 14:06:09
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
				const service = platform.Events.Reducers.Definitions.Service;
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
				const service = platform.Events.Reducers.Definitions.Service;
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
			events: {
				items: [Factories.Events.Events()],
				reducersDefinitions: [Factories.Events.Reducers.Definitions()]
			},
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Events.Reducers.Definitions.Service;
				const [definition] = parameters?.events?.reducersDefinitions ?? [];
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
		const eventsItemsParameters = [Factories.Events.Events()];
		const eventsParameters = {
			items: eventsItemsParameters,
			reducersDefinitions: eventsItemsParameters.map(( { id }) => Factories.Events.Reducers.Definitions({ triggeringEventId: id }))
		}
		const parameters = {
			events: eventsParameters
		};
		const expectedResults = eventsParameters.reducersDefinitions;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Events.Reducers.Definitions.Service;
				const [definition] = parameters?.events?.reducersDefinitions ?? [];
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
		const eventsItemsParameters = [Factories.Events.Events()];
		const expectedResults = eventsItemsParameters.map(( { id }) => Factories.Events.Reducers.Definitions({ triggeringEventId: id }));
		const eventsParameters = {
			items: eventsItemsParameters,
			reducersDefinitions: [
				...expectedResults,
				Factories.Events.Reducers.Definitions(),
				Factories.Events.Reducers.Definitions(),
				Factories.Events.Reducers.Definitions(),
				Factories.Events.Reducers.Definitions(),
			]
		}
		const parameters = {
			events: eventsParameters,
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Events.Reducers.Definitions.Service;
				const [definition] = parameters?.events?.reducersDefinitions ?? [];
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
		const eventsItemsParameters = [Factories.Events.Events()];
		const expectedResults = [
			...eventsItemsParameters.map(( { id }) => Factories.Events.Reducers.Definitions({ triggeringEventId: id })),
			...eventsItemsParameters.map(( { id }) => Factories.Events.Reducers.Definitions({ triggeringEventId: id })),
			...eventsItemsParameters.map(( { id }) => Factories.Events.Reducers.Definitions({ triggeringEventId: id })),
			...eventsItemsParameters.map(( { id }) => Factories.Events.Reducers.Definitions({ triggeringEventId: id })),
			...eventsItemsParameters.map(( { id }) => Factories.Events.Reducers.Definitions({ triggeringEventId: id }))
		];
		const eventsParameters = {
			items: eventsItemsParameters,
			reducersDefinitions: [
				...expectedResults,
				Factories.Events.Reducers.Definitions(),
				Factories.Events.Reducers.Definitions(),
				Factories.Events.Reducers.Definitions(),
				Factories.Events.Reducers.Definitions(),
			]
		}
		const parameters = {
			events: eventsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const service = platform.Events.Reducers.Definitions.Service;
				const reducersDefinitions = parameters?.events?.reducersDefinitions ?? [];
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
