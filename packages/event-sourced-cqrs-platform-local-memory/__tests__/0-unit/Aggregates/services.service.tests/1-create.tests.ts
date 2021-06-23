/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:45:46
 */

import test from 'ava';

import Core from "event-sourced-cqrs-core";
import Platform from "../../../../src/index.js";
import { aggregateRepositoryFactory } from "../aggregates-repository.factory";

test('Aggregates Service Creation succeeds with proper parameter', async t => {
	let service = Platform.Aggregates.ServicesService();
	let aggregatesRepository = aggregateRepositoryFactory();
	await t.notThrows(async () => await service.create(aggregatesRepository));
});

test('Aggregates Service is returned after creation', async t => {
	let service = Platform.Aggregates.ServicesService();
	let aggregatesRepository = aggregateRepositoryFactory();
	let aggregatesService = Core.Aggregates.Service(aggregatesRepository);
	let createdAggregatesService = await service.create(aggregatesRepository)
	t.is(JSON.stringify(createdAggregatesService), JSON.stringify(aggregatesService));
});

