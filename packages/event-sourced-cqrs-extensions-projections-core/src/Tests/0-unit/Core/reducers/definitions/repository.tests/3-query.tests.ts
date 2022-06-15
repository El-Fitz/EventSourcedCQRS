/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:05:03 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:26:06
 */

import * as FrameworkCore from "event-sourced-cqrs-core";
import { TestFn } from 'ava';
import { Platform } from "../../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';
import * as Factories from '../../../../../Factories/index.js';

export const testSuites: TestSuite[] = [
	(() => {
		const title = 'Querying the repository will not throw when there are no definitions';
		const initialState = undefined;
		const eventsParameters = {
			items: [FrameworkCore.Tests.Factories.Events.Events()]
		};
		const parameters = {
			events: eventsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Reducers.Definitions.Repository;
				const [event] = parameters?.events?.items ?? [];
				await t.notThrows(async () => await repository.query(event))
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
		const title = 'Querying the repository will return an empty array when there are no definitions';
		const initialState = undefined;
		const parameters = {
			events: {
				items: [FrameworkCore.Tests.Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Reducers.Definitions.Repository;
				const [event] = parameters?.events?.items ?? [];
				let fetchedDefinitions = await repository.query(event)
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
		const title = 'Querying the repository will return an empty array when no definitions match the event';
		const initialState = undefined;
		const parameters = {
			projections: {
				reducersDefinitions: [Factories.Reducers.Definitions()]
			},
			events: {
				items: [FrameworkCore.Tests.Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Reducers.Definitions.Repository;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await repository.create(definition);
				let fetchedDefinitions = await repository.query(event)
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
		const title = 'Querying the repository will return a definition when one matches the event';
		const initialState = undefined;
		const eventsParameters = {
			items: [FrameworkCore.Tests.Factories.Events.Events()]
		};
		const projectionsParameters = {
			reducersDefinitions: eventsParameters.items.map(( { id }) => FrameworkCore.Tests.Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id })),
		}
		const parameters = {
			projections: projectionsParameters,
			events: eventsParameters
		};
		const expectedResults = projectionsParameters.reducersDefinitions;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Reducers.Definitions.Repository;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await repository.create(definition);
				let fetchedDefinitions = await repository.query(event)
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
		const title = 'Querying the repository will only return the definition matching the event';
		const initialState = undefined;
		const eventsParameters = {
			items: [FrameworkCore.Tests.Factories.Events.Events()]
		};
		const expectedResults = eventsParameters.items.map(( { id }) => FrameworkCore.Tests.Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id }));
		const projectionsParameters = {
			reducersDefinitions: [
				...expectedResults,
				Factories.Reducers.Definitions(),
				Factories.Reducers.Definitions(),
				Factories.Reducers.Definitions(),
				Factories.Reducers.Definitions(),
			]
		}
		const parameters = {
			projections: projectionsParameters,
			events: eventsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Reducers.Definitions.Repository;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await repository.create(definition);
				let fetchedDefinitions = await repository.query(event)
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
		const title = 'Querying the repository will return every definition matching the event';
		const initialState = undefined;
		const eventsParameters = {
			items: [FrameworkCore.Tests.Factories.Events.Events()]
		};
		const expectedResults = [
			...eventsParameters.items.map(( { id }) => FrameworkCore.Tests.Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id })),
			...eventsParameters.items.map(( { id }) => FrameworkCore.Tests.Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id })),
			...eventsParameters.items.map(( { id }) => FrameworkCore.Tests.Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id })),
			...eventsParameters.items.map(( { id }) => FrameworkCore.Tests.Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id })),
			...eventsParameters.items.map(( { id }) => FrameworkCore.Tests.Factories.Aggregates.Reducers.Definitions({ triggeringEventId: id })),
		];
		const projectionsParameters = {
			reducersDefinitions: [
				...expectedResults,
				Factories.Reducers.Definitions(),
				Factories.Reducers.Definitions(),
				Factories.Reducers.Definitions(),
				Factories.Reducers.Definitions(),
			]
		}
		const parameters = {
			projections: projectionsParameters,
			events: eventsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				const repository = platform.Reducers.Definitions.Repository;
				const reducersDefinitions = parameters?.projections?.reducersDefinitions ?? [];
				const [event] = parameters?.events?.items ?? [];
				await Promise.all(reducersDefinitions.map(repository.create));
				let fetchedDefinitions = await repository.query(event)
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
