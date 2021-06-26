/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 16:34:24
 */


import test from 'ava';
import { v4 as uuid } from "uuid";
import Platform from "../../../../src/index.js";
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";

test('Aggregates Repository can be retrieved after creation', async t => {
	let repository = Platform.Aggregates.RepositoriesRepository();
	let aggregatesRepository = aggregateRepositoryFactory();
	await repository.create(aggregatesRepository);
	await t.notThrows(async () => await repository.get(aggregatesRepository.id))
});

test('The repository returns the expected Aggregates Repository', async t => {
	let repository = Platform.Aggregates.RepositoriesRepository();
	let aggregatesRepository = aggregateRepositoryFactory();
	await repository.create(aggregatesRepository);
	let fetchedRepository = await repository.get(aggregatesRepository.id)
	t.deepEqual(fetchedRepository, aggregatesRepository)
});

test('The repository returns null when the requested Aggregates Repository does not exist', async t => {
	let repository = Platform.Aggregates.RepositoriesRepository();
	let aggregatesRepository = aggregateRepositoryFactory();
	await repository.create(aggregatesRepository);
	let fetchedRepository = await repository.get(uuid());
	t.deepEqual(fetchedRepository, null);
});