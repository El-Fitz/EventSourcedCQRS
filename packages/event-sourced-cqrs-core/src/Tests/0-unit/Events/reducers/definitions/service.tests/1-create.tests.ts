// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-19 17:26:53 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:27:19
//  */

// import test from 'ava';
// import { v4 as uuid } from "uuid"
// import { DateTime } from "luxon"
// import Core from "event-sourced-cqrs-core"
// import Platform from "../../../../../../index.js"

// test('Event Reducers Definitions Service Creation succeeds with proper parameter', async t => {
// 	let service = Platform.Events.Reducers.Definitions.Service()
// 	let definition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: uuid(),
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	await t.notThrows(async () => await service.create(definition));
// });

// test('Event Reducers Definition is returned after creation', async t => {
// 	let service = Platform.Events.Reducers.Definitions.Service()
// 	let definition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: uuid(),
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	let createdDefinition= await service.create(definition)
// 	t.deepEqual(createdDefinition, definition)
// });
