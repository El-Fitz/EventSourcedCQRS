/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:09:36
*/

import { TestInterface } from 'ava';

import { PlatformInterface } from "../../../../index.js";
import { projectionRepositoryFactory } from "../_projections-repository.factory";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Repositories Repository - Projections Repository Creation succeeds with proper parameter', async t => {
		let repository = platform.Projections.RepositoriesRepository;
		let projectionsRepository = projectionRepositoryFactory();
		await t.notThrows(async () => await repository.create(projectionsRepository));
	});
	
	test('Agggregates - Repositories Repository - Projections Repository is returned after creation', async t => {
		let repository = platform.Projections.RepositoriesRepository;
		let projectionsRepository = projectionRepositoryFactory();
		let createdProjectionsRepository = await repository.create(projectionsRepository)
		t.deepEqual(createdProjectionsRepository, projectionsRepository)
	});
}
