/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 02:28:20
 */

import { v4 as uuid } from "uuid";

import { TestInterface } from 'ava';
import * as Core from "../../../../../../index.js";
import * as Factories from '../../../../../Factories/index.js';
import { PlatformInterface } from "../../../../../../index.js";

export const testDefinitions = [
	(() => {
		let reducers: Core.Aggregates.Reducers.Reducer[] = [Factories.Aggregates.Reducers.Reducers()];
		let definitions: Core.Aggregates.Reducers.Definitions.Definition[] =
			reducers.map((reducer) => Factories.Aggregates.Reducers.Definitions(reducer));
		return {
			reducers,
			definitions,
			definitionsToLoad: definitions,
			expectedResults: [],
		}
	})(),
	(() => {
		let reducers: Core.Aggregates.Reducers.Reducer[] = [Factories.Aggregates.Reducers.Reducers()];
		let definitions: Core.Aggregates.Reducers.Definitions.Definition[] =
			reducers.map((reducer) => Factories.Aggregates.Reducers.Definitions(reducer));
		return {
			reducers,
			definitions,
			definitionsToLoad: definitions,
			expectedResults: [],
		}
	})(),
	(() => {
		let reducers: Core.Aggregates.Reducers.Reducer[] = [Factories.Aggregates.Reducers.Reducers()];
		let definitions: Core.Aggregates.Reducers.Definitions.Definition[] =
			reducers.map((reducer) => Factories.Aggregates.Reducers.Definitions(reducer));
		return {
			reducers,
			definitions,
			definitionsToLoad: definitions,
			expectedResults: [],
		}
	})(),
]

export default {
	testDefinitions,
	RunTests: (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
		test('Agggregates - Reducers - Definitions - Service - Reducer Definition can be retrieved after creation', async t => {
			let service = platform.Aggregates.Reducers.Definitions.Service
			const { definitions: [definition] } = testDefinitions[0];
			await t.notThrows(async () => await service.get(definition.id))
		});
		
		test('Agggregates - Reducers - Definitions - Service - The service returns the expected reducer definition', async t => {
			let service = platform.Aggregates.Reducers.Definitions.Service;
			const { definitions } = testDefinitions[1];
			const [ definition ] = definitions;
			let fetchedDefinition = await service.get(definition.id)
			t.deepEqual(fetchedDefinition, [definition])
		});
		
		test('Agggregates - Reducers - Definitions - Service - The service returns an empty array when the requested reducer definition does not exist', async t => {
			let service = platform.Aggregates.Reducers.Definitions.Service
			const { expectedResults } = testDefinitions[2];
			let fetchedDefinition = await service.get(uuid())
			t.deepEqual(fetchedDefinition, expectedResults)
		});
	}
}
