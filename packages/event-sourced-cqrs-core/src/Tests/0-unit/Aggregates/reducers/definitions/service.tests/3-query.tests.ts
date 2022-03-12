/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:30 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 16:48:47
 */

import { TestInterface } from 'ava';
import * as Core from "../../../../../../index.js";
import * as Factories from '../../../../../Factories/index.js';
import { PlatformInterface } from "../../../../../../index.js";

export const testDefinitions = [
	(() => {
		let events: Core.Events.Event[] = [Factories.Events.Events()];
		let reducers: Core.Aggregates.Reducers.Reducer[] = [];
		let definitions: Core.Aggregates.Reducers.Definitions.Definition[] =
			reducers.map(() => Factories.Aggregates.Reducers.Definitions(events[0].id));
		return {
			events,
			reducers,
			definitions,
			definitionsToLoad: definitions,
			expectedResults: [],
		}
	})(),
	(() => {
		let events: Core.Events.Event[] = [Factories.Events.Events()];
		let reducers: Core.Aggregates.Reducers.Reducer[] = [];
		let definitions: Core.Aggregates.Reducers.Definitions.Definition[] =
			reducers.map(() => Factories.Aggregates.Reducers.Definitions());
		return {
			events,
			reducers,
			definitions,
			definitionsToLoad: definitions,
			expectedResults: [],
		}
	})(),
	(() => {
		let events: Core.Events.Event[] = [Factories.Events.Events()];
		let reducers: Core.Aggregates.Reducers.Reducer[] = [Factories.Aggregates.Reducers.Reducers()];
		let definitions: Core.Aggregates.Reducers.Definitions.Definition[] =
			reducers.map(() => Factories.Aggregates.Reducers.Definitions());
		return {
			events,
			reducers,
			definitions,
			definitionsToLoad: definitions,
			expectedResults: [],
		}
	})(),
	(() => {
		let events: Core.Events.Event[] = [Factories.Events.Events()];
		let reducers: Core.Aggregates.Reducers.Reducer[] = [Factories.Aggregates.Reducers.Reducers()];
		let definitions: Core.Aggregates.Reducers.Definitions.Definition[] =
			reducers.map(() => Factories.Aggregates.Reducers.Definitions(events[0].id));
		return {
			events,
			reducers,
			definitions,
			definitionsToLoad: definitions,
			expectedResults: definitions,
		}
	})(),
	(() => {
		let events: Core.Events.Event[] = [Factories.Events.Events()];
		let reducersToLoad: Core.Aggregates.Reducers.Reducer[] = [
			Factories.Aggregates.Reducers.Reducers()
		];
		let reducers = [
			...reducersToLoad,
			Factories.Aggregates.Reducers.Reducers(),
			Factories.Aggregates.Reducers.Reducers(),
			Factories.Aggregates.Reducers.Reducers()
		]
		let definitionsToLoad: Core.Aggregates.Reducers.Definitions.Definition[] =
			reducersToLoad.map(() => Factories.Aggregates.Reducers.Definitions(events[0].id));
		let definitions =
			reducers.map(() => Factories.Aggregates.Reducers.Definitions(events[0].id));
		return {
			events,
			reducers,
			definitions,
			definitionsToLoad,
			expectedResults: definitionsToLoad,
		}
	})(),
	(() => {
		let events: Core.Events.Event[] = [Factories.Events.Events()];
		let reducersToLoad: Core.Aggregates.Reducers.Reducer[] = [
			Factories.Aggregates.Reducers.Reducers(),
			Factories.Aggregates.Reducers.Reducers(),
			Factories.Aggregates.Reducers.Reducers()
		];
		let reducers = [
			...reducersToLoad,
			Factories.Aggregates.Reducers.Reducers(),
		]
		let definitionsToLoad: Core.Aggregates.Reducers.Definitions.Definition[] =
			reducersToLoad.map(() => Factories.Aggregates.Reducers.Definitions(events[0].id));
		let definitions =
			reducers.map(() => Factories.Aggregates.Reducers.Definitions(events[0].id));
		return {
			events,
			reducers,
			definitions,
			definitionsToLoad,
			expectedResults: definitionsToLoad,
		}
	})(),
]

export default {
	testDefinitions,
	RunTests: (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
		test('Agggregates - Reducers - Definitions - Service - Querying the service will not throw when there are no definitions', async t => {
			let service = platform.Aggregates.Reducers.Definitions.Service
			let testDefinition = testDefinitions[0];
			let { events: [event] } = testDefinition;
			await t.notThrows(async () => await service.query(event))
		});
		
		test('Agggregates - Reducers - Definitions - Service - Querying the service will return an empty array when there are no definitions', async t => {
			let service = platform.Aggregates.Reducers.Definitions.Service
			let testDefinition = testDefinitions[1];
			let { events: [event], expectedResults } = testDefinition;
			let fetchedDefinitions = await service.query(event)
			t.deepEqual(fetchedDefinitions, expectedResults)
		});
		
		test('Agggregates - Reducers - Definitions - Service - Querying the service will return an empty array when no definitions match the event', async t => {
			let service = platform.Aggregates.Reducers.Definitions.Service
			let testDefinition = testDefinitions[2];
			let { events: [event], expectedResults } = testDefinition;
			let fetchedDefinition = await service.query(event)
			t.deepEqual(fetchedDefinition, expectedResults)
		});
		
		test('Agggregates - Reducers - Definitions - Service - Querying the service will return a definition when one matches the event', async t => {
			let service = platform.Aggregates.Reducers.Definitions.Service
			let testDefinition = testDefinitions[3];
			let { events: [event], expectedResults } = testDefinition;
			let fetchedDefinition = await service.query(event)
			t.deepEqual(fetchedDefinition, expectedResults)
		});
		
		test('Agggregates - Reducers - Definitions - Service - Querying the service will only return the definition matching the event', async t => {
			let service = platform.Aggregates.Reducers.Definitions.Service
			let testDefinition = testDefinitions[4];
			let { events: [event], expectedResults } = testDefinition;
			let fetchedDefinition = await service.query(event)
			t.deepEqual(fetchedDefinition, expectedResults)
		});
		
		
		test('Agggregates - Reducers - Definitions - Service - Querying the service will return every definition matching the event', async t => {
			let service = platform.Aggregates.Reducers.Definitions.Service
			let testDefinition = testDefinitions[5];
			let { events: [event], expectedResults } = testDefinition;
			let fetchedDefinition = await service.query(event)
			t.deepEqual(fetchedDefinition, expectedResults)
		});
	}
}
