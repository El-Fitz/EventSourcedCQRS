// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-19 17:27:33 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:26:47
//  */

// import test from 'ava';
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon"
// import Core from "event-sourced-cqrs-core"
// import Platform from "../../../../../../index.js"

// test('Event Reducer Definition can be deleted after creation', async t => {
// 	let repository = Platform.Events.Reducers.Definitions.Repository()
// 	let definition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: uuid(),
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	await repository.create(definition)
// 	await t.notThrows(async () => await repository.delete(definition))
// });

// test('The repository does not return the Event Reducer Definition once it has been deleted', async t => {
// 	let repository = Platform.Events.Reducers.Definitions.Repository()
// 	let definition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: uuid(),
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	await repository.create(definition)
// 	await repository.delete(definition)
// 	let fetchedDefinition = await repository.get(definition.id)
// 	t.deepEqual(fetchedDefinition, null)
// });