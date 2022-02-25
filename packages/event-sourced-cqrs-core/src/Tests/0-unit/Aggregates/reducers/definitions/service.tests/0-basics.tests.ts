/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 17:58:19
*/


import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Reducers - Definitions - Service - Succesfully initializes Reducers Definitions Service', t => {
		let service = platform.Aggregates.Reducers.Definitions.Service
		t.not(service, undefined);
	});
	
	test('Agggregates - Reducers - Definitions - Service - Reducers Definitions Service has the proper methods', t => {
		let service = platform.Aggregates.Reducers.Definitions.Service
		t.not(service.create, undefined);
		t.not(service.get, undefined);
		t.not(service.query, undefined);
		t.not(service.delete, undefined);
	});
}
