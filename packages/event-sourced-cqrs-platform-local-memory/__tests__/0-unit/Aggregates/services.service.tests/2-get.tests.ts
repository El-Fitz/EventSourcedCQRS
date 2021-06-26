/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 16:33:21
 */


import test from 'ava';
import { v4 as uuid } from "uuid";

import Core from "event-sourced-cqrs-core";
import Platform from "../../../../src/index.js";
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";

test('Aggregates Service can be retrieved after creation', async t => {
	let service = Platform.Aggregates.ServicesService();
	let aggregatesRepository = aggregateRepositoryFactory();
	let aggregatesService = Core.Aggregates.Service(aggregatesRepository);
	await service.create(aggregatesRepository);
	await t.notThrows(async () => await service.get(aggregatesService.repositoryId))
});

test('The service returns the expected Aggregates Service', async t => {
	let service = Platform.Aggregates.ServicesService();
	let aggregatesRepository = aggregateRepositoryFactory();
	let aggregatesService = Core.Aggregates.Service(aggregatesRepository);
	await service.create(aggregatesRepository);
	let fetchedAggregatesService = await service.get(aggregatesService.repositoryId)
	t.is(JSON.stringify(fetchedAggregatesService), JSON.stringify(aggregatesService));
});

test('The service returns null when the requested Aggregates Service does not exist', async t => {
	let service = Platform.Aggregates.ServicesService();
	let aggregatesRepository = aggregateRepositoryFactory();
	await service.create(aggregatesRepository);
	let fetchedAggregatesService = await service.get(uuid())
	t.deepEqual(fetchedAggregatesService, null)
});