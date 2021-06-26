/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 16:34:21
 */

import test from 'ava';
import Platform from "../../../../src/index.js";
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";

test('Aggregates Repository can be deleted after creation', async t => {
	let repository = Platform.Aggregates.RepositoriesRepository();
	let aggregatesRepository = aggregateRepositoryFactory();
	await repository.create(aggregatesRepository);
	await t.notThrows(async () => await repository.delete(aggregatesRepository.id))
});

test('The repository does not return the Aggregates Repository once it has been deleted', async t => {
	let repository = Platform.Aggregates.RepositoriesRepository();
	let aggregatesRepository = aggregateRepositoryFactory();
	await repository.create(aggregatesRepository);
	await repository.delete(aggregatesRepository.id)
	let fetchedDefinition = await repository.get(aggregatesRepository.id)
	t.deepEqual(fetchedDefinition, null)
});