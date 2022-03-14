/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:42:20
 */

import { TestInterface } from 'ava';
import * as Core from "../../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../../Domain';
import * as Factories from '../../../../../Factories/index.js';

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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Definitions.Service;
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Definitions.Service;
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
			projections: {
				reducersDefinitions: [Factories.Projections.Reducers.Definitions()]
			},
			events: {
				items: [Factories.Events.Events()]
			}
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Definitions.Service;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
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
		const projectionsParameters = {
			reducersDefinitions: eventsParameters.items.map(( { id }) => Factories.Projections.Reducers.Definitions(id))
		}
		const parameters = {
			projections: projectionsParameters,
			events: eventsParameters
		};
		const expectedResults = projectionsParameters.reducersDefinitions;
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Definitions.Service;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
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
		const expectedResults = eventsParameters.items.map(( { id }) => Factories.Projections.Reducers.Definitions(id));
		const projectionsParamters = {
			reducersDefinitions: [
				...expectedResults,
				Factories.Projections.Reducers.Definitions(),
				Factories.Projections.Reducers.Definitions(),
				Factories.Projections.Reducers.Definitions(),
				Factories.Projections.Reducers.Definitions(),
			]
		}
		const parameters = {
			projections: projectionsParamters,
			events: eventsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Definitions.Service;
				const [definition] = parameters?.projections?.reducersDefinitions ?? [];
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
			...eventsParameters.items.map(( { id }) => Factories.Projections.Reducers.Definitions(id)),
			...eventsParameters.items.map(( { id }) => Factories.Projections.Reducers.Definitions(id)),
			...eventsParameters.items.map(( { id }) => Factories.Projections.Reducers.Definitions(id)),
			...eventsParameters.items.map(( { id }) => Factories.Projections.Reducers.Definitions(id)),
			...eventsParameters.items.map(( { id }) => Factories.Projections.Reducers.Definitions(id))
		];
		const projectionsParamters = {
			reducersDefinitions: [
				...expectedResults,
				Factories.Projections.Reducers.Definitions(),
				Factories.Projections.Reducers.Definitions(),
				Factories.Projections.Reducers.Definitions(),
				Factories.Projections.Reducers.Definitions(),
			]
		}
		const parameters = {
			projections: projectionsParamters,
			events: eventsParameters
		};
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				const service = platform.Projections.Reducers.Definitions.Service;
				const reducersDefinitions = parameters?.projections?.reducersDefinitions ?? [];
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
