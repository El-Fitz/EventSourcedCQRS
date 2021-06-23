/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:38:45
 */

import test from 'ava';

import Core from "event-sourced-cqrs-core";
import Platform from "../../../../src/index.js";
import { aggregateRepositoryFactory } from "../aggregates-repository.factory";

test('Aggregates Service can be deleted after creation', async t => {
	let service = Platform.Aggregates.ServicesService();
	let aggregatesRepository = aggregateRepositoryFactory();
	let aggregatesService = Core.Aggregates.Service(aggregatesRepository);
	await service.create(aggregatesRepository);
	await t.notThrows(async () => await service.delete(aggregatesService.repositoryId))
});

test('The service does not return the Aggregates Service once it has been deleted', async t => {
	let service = Platform.Aggregates.ServicesService();
	let aggregatesRepository = aggregateRepositoryFactory();
	let aggregatesService = Core.Aggregates.Service(aggregatesRepository);
	await service.create(aggregatesRepository);
	await service.delete(aggregatesService.repositoryId)
	let fetchedAggregatesService = await service.get(aggregatesService.repositoryId)
	t.deepEqual(fetchedAggregatesService, null)
});