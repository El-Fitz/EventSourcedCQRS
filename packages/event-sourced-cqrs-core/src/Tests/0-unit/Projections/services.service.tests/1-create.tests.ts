/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:10:00
 */

import { TestInterface } from 'ava';

import * as Core from "../../../../index.js";
import { PlatformInterface } from "../../../../index.js";
import { projectionRepositoryFactory } from "../_projections-repository.factory";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Services Service - Projections Service Creation succeeds with proper parameter', async t => {
		let service = platform.Projections.ServicesService;
		let projectionsRepository = projectionRepositoryFactory();
		await t.notThrows(async () => await service.create(projectionsRepository));
	});
	
	test('Agggregates - Services Service - Projections Service is returned after creation', async t => {
		let service = platform.Projections.ServicesService;
		let projectionsRepository = projectionRepositoryFactory();
		let projectionsService = Core.Projections.Service(projectionsRepository);
		let createdProjectionsService = await service.create(projectionsRepository)
		t.is(JSON.stringify(createdProjectionsService), JSON.stringify(projectionsService));
	});
}
