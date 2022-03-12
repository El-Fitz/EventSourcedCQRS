/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:09:42
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../index.js";
import { projectionRepositoryFactory } from "../_projections-repository.factory";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Repositories Repository - Projections Repository can be deleted after creation', async t => {
		let repository = platform.Projections.RepositoriesRepository;
		let projectionsRepository = projectionRepositoryFactory();
		await repository.create(projectionsRepository);
		await t.notThrows(async () => await repository.delete(projectionsRepository.id))
	});
	
	test('Agggregates - Repositories Repository - The repository does not return the Projections Repository once it has been deleted', async t => {
		let repository = platform.Projections.RepositoriesRepository;
		let projectionsRepository = projectionRepositoryFactory();
		await repository.create(projectionsRepository);
		await repository.delete(projectionsRepository.id)
		let fetchedDefinition = await repository.get(projectionsRepository.id)
		t.deepEqual(fetchedDefinition, null)
	});
}
