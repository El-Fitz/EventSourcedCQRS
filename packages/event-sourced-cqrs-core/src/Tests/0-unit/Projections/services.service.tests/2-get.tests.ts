/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:10:04
 */

import { TestInterface } from 'ava';
import { v4 as uuid } from "uuid";

import * as Core from "../../../../index.js";
import { PlatformInterface } from "../../../../index.js";
import { projectionRepositoryFactory } from "../_projections-repository.factory";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Services Service - Projections Service can be retrieved after creation', async t => {
		let service = platform.Projections.ServicesService;
		let projectionsRepository = projectionRepositoryFactory();
		let projectionsService = Core.Projections.Service(projectionsRepository);
		await service.create(projectionsRepository);
		await t.notThrows(async () => await service.get(projectionsService.repositoryId))
	});
	
	test('Agggregates - Services Service - The service returns the expected Projections Service', async t => {
		let service = platform.Projections.ServicesService;
		let projectionsRepository = projectionRepositoryFactory();
		let projectionsService = Core.Projections.Service(projectionsRepository);
		await service.create(projectionsRepository);
		let fetchedProjectionsService = await service.get(projectionsService.repositoryId)
		t.is(JSON.stringify(fetchedProjectionsService), JSON.stringify(projectionsService));
	});
	
	test('Agggregates - Services Service - The service returns null when the requested Projections Service does not exist', async t => {
		let service = platform.Projections.ServicesService;
		let projectionsRepository = projectionRepositoryFactory();
		await service.create(projectionsRepository);
		let fetchedProjectionsService = await service.get(uuid())
		t.deepEqual(fetchedProjectionsService, null)
	});
}
