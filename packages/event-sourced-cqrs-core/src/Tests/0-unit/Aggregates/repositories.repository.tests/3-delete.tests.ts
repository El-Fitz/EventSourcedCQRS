/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:09:42
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../index.js";
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Repositories Repository - Aggregates Repository can be deleted after creation', async t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		let aggregatesRepository = aggregateRepositoryFactory();
		await repository.create(aggregatesRepository);
		await t.notThrows(async () => await repository.delete(aggregatesRepository.id))
	});
	
	test('Agggregates - Repositories Repository - The repository does not return the Aggregates Repository once it has been deleted', async t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		let aggregatesRepository = aggregateRepositoryFactory();
		await repository.create(aggregatesRepository);
		await repository.delete(aggregatesRepository.id)
		let fetchedDefinition = await repository.get(aggregatesRepository.id)
		t.deepEqual(fetchedDefinition, null)
	});
}
