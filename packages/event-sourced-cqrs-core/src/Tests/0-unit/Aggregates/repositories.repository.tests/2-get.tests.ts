/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:09:39
*/

import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";
import { PlatformInterface } from "../../../../index.js";
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Repositories Repository - Aggregates Repository can be retrieved after creation', async t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		let aggregatesRepository = aggregateRepositoryFactory();
		await repository.create(aggregatesRepository);
		await t.notThrows(async () => await repository.get(aggregatesRepository.id))
	});
	
	test('Agggregates - Repositories Repository - The repository returns the expected Aggregates Repository', async t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		let aggregatesRepository = aggregateRepositoryFactory();
		await repository.create(aggregatesRepository);
		let fetchedRepository = await repository.get(aggregatesRepository.id)
		t.deepEqual(fetchedRepository, aggregatesRepository)
	});
	
	test('Agggregates - Repositories Repository - The repository returns null when the requested Aggregates Repository does not exist', async t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		let aggregatesRepository = aggregateRepositoryFactory();
		await repository.create(aggregatesRepository);
		let fetchedRepository = await repository.get(uuid());
		t.deepEqual(fetchedRepository, null);
	});
}
