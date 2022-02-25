/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:09:29
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Repositories Repository - Succesfully initializes Aggregates Repositories Repository', t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		t.not(repository, undefined);
	});
	
	test('Agggregates - Repositories Repository - Aggregates Repositories Repository has the proper methods', t => {
		let repository = platform.Aggregates.RepositoriesRepository;
		t.not(repository.create, undefined);
		t.not(repository.get, undefined);
		t.not(repository.delete, undefined);
	});
}
