/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-24 00:40:51
 */

import test from 'ava';
import Platform from "../../../../src/index.js";

import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";

test('Aggregates Repository Creation succeeds with proper parameter', async t => {
	let repository = Platform.Aggregates.RepositoriesRepository();
	let aggregatesRepository = aggregateRepositoryFactory();
	await t.notThrows(async () => await repository.create(aggregatesRepository));
});

test('Aggregates Repository is returned after creation', async t => {
	let repository = Platform.Aggregates.RepositoriesRepository();
	let aggregatesRepository = aggregateRepositoryFactory();
	let createdAggregatesRepository = await repository.create(aggregatesRepository)
	t.deepEqual(createdAggregatesRepository, aggregatesRepository)
});
