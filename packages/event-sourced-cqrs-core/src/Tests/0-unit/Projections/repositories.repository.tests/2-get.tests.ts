/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:09:39
*/

import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";
import { PlatformInterface } from "../../../../index.js";
import { projectionRepositoryFactory } from "../_projections-repository.factory";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Repositories Repository - Projections Repository can be retrieved after creation', async t => {
		let repository = platform.Projections.RepositoriesRepository;
		let projectionsRepository = projectionRepositoryFactory();
		await repository.create(projectionsRepository);
		await t.notThrows(async () => await repository.get(projectionsRepository.id))
	});
	
	test('Agggregates - Repositories Repository - The repository returns the expected Projections Repository', async t => {
		let repository = platform.Projections.RepositoriesRepository;
		let projectionsRepository = projectionRepositoryFactory();
		await repository.create(projectionsRepository);
		let fetchedRepository = await repository.get(projectionsRepository.id)
		t.deepEqual(fetchedRepository, projectionsRepository)
	});
	
	test('Agggregates - Repositories Repository - The repository returns null when the requested Projections Repository does not exist', async t => {
		let repository = platform.Projections.RepositoriesRepository;
		let projectionsRepository = projectionRepositoryFactory();
		await repository.create(projectionsRepository);
		let fetchedRepository = await repository.get(uuid());
		t.deepEqual(fetchedRepository, null);
	});
}
