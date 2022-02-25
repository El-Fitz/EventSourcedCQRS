/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:09:57
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Services Service - Succesfully initializes Aggregates Services Service', t => {
		let service = platform.Aggregates.ServicesService;
		t.not(service, undefined);
	});
	
	test('Agggregates - Services Service - Aggregates Services Service has the proper methods', t => {
		let service = platform.Aggregates.ServicesService;
		t.not(service.create, undefined);
		t.not(service.get, undefined);
		t.not(service.delete, undefined);
	});
}
