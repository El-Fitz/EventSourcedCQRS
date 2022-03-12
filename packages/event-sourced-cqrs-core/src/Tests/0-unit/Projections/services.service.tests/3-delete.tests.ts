/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:10:11
 */

import { TestInterface } from 'ava';

import * as Core from "../../../../index.js";
import { PlatformInterface } from "../../../../index.js";
import { projectionRepositoryFactory } from "../_projections-repository.factory";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Services Service - Projections Service can be deleted after creation', async t => {
		let service = platform.Projections.ServicesService;
		let projectionsRepository = projectionRepositoryFactory();
		let projectionsService = Core.Projections.Service(projectionsRepository);
		await service.create(projectionsRepository);
		await t.notThrows(async () => await service.delete(projectionsService.repositoryId))
	});
	
	test('Agggregates - Services Service - The service does not return the Projections Service once it has been deleted', async t => {
		let service = platform.Projections.ServicesService;
		let projectionsRepository = projectionRepositoryFactory();
		let projectionsService = Core.Projections.Service(projectionsRepository);
		await service.create(projectionsRepository);
		await service.delete(projectionsService.repositoryId)
		let fetchedProjectionsService = await service.get(projectionsService.repositoryId)
		t.deepEqual(fetchedProjectionsService, null)
	});
}
