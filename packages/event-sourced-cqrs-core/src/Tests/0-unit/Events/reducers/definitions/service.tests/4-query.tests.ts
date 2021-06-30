// /*
//  * @Author: Thomas Léger 
//  * @Date: 2021-06-19 17:27:30 
//  * @Last Modified by: Thomas Léger
//  * @Last Modified time: 2021-06-26 19:29:10
//  */

// import test from 'ava';
// import { v4 as uuid } from "uuid";
// import { DateTime } from "luxon";

// import Core from "event-sourced-cqrs-core";
// import Platform from "../../../../../../index.js"

// test('Querying the service will not throw when there are no definitions', async t => {
// 	let service = Platform.Events.Reducers.Definitions.Service()
// 	let event: Core.Events.Event = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	await t.notThrows(async () => await service.query(event))
// });

// test('Querying the service will return an empty array when there are no definitions', async t => {
// 	let service = Platform.Events.Reducers.Definitions.Service()
// 	let event: Core.Events.Event = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	let fetchedDefinitions = await service.query(event)
// 	t.deepEqual(fetchedDefinitions, [])
// });

// test('Querying the service will return an empty array when no definitions match the event', async t => {
// 	let service = Platform.Events.Reducers.Definitions.Service()
// 	let event: Core.Events.Event = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	let definition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: uuid(),
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	await service.create(definition)
// 	let fetchedDefinition = await service.query(event)
// 	t.deepEqual(fetchedDefinition, [])
// });

// test('Querying the service will return a definition when one matches the event', async t => {
// 	let service = Platform.Events.Reducers.Definitions.Service()
// 	let event: Core.Events.Event = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	let definition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: event.id,
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	await service.create(definition)
// 	let fetchedDefinition = await service.query(event)
// 	t.deepEqual(fetchedDefinition, [definition])
// });

// test('Querying the service will only return the definition matching the event', async t => {
// 	let service = Platform.Events.Reducers.Definitions.Service()
// 	let event: Core.Events.Event = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	let matchingDefinition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: event.id,
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	let nonMatchingDefinition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: uuid(),
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	await Promise.all([
// 		service.create(matchingDefinition),
// 		service.create(nonMatchingDefinition),
// 	])
// 	let fetchedDefinition = await service.query(event)
// 	t.deepEqual(fetchedDefinition, [matchingDefinition])
// });


// test('Querying the service will return every definition matching the event', async t => {
// 	let service = Platform.Events.Reducers.Definitions.Service()
// 	let event: Core.Events.Event = {
//     id: uuid(),
//     creationDate: DateTime.now(),
//     instanceId: uuid(),
//     tracingId: uuid(),
//     version: "1.0.0",
//     name: "name",
//     body:  { }
// 	}
// 	let firstMatchingDefinition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: event.id,
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	let secondMatchingDefinition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: event.id,
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	let nonMatchingDefinition: Core.Events.Reducers.Definitions.Definition = {
// 		id: uuid(),
// 		creationDate: DateTime.now(),
// 		requiredAggregates: [],
// 		triggeringEventId: uuid(),
// 		reducer: () => Promise.resolve((_event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([]))
// 	}
// 	await Promise.all([
// 		service.create(firstMatchingDefinition),
// 		service.create(secondMatchingDefinition),
// 		service.create(nonMatchingDefinition),
// 	])
// 	let fetchedDefinition = await service.query(event)
// 	t.deepEqual(fetchedDefinition, [firstMatchingDefinition, secondMatchingDefinition])
// });