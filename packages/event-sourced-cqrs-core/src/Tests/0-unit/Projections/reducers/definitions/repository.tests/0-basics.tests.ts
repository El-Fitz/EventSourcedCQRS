/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 00:05:58
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../../../index.js";

export default (platform: PlatformInterface) => (test: TestInterface<unknown>) => {
	test('Agggregates - Reducers - Definitions - Repository - Succesfully initializes Reducers Definitions Repository', t => {
		let repository = platform.Projections.Reducers.Definitions.Repository;
		t.not(repository, undefined);
	});

	test('Agggregates - Reducers - Definitions - Repository - Reducers Definitions Repository has the proper methods', t => {
		let repository = platform.Projections.Reducers.Definitions.Repository;
		t.not(repository.get, undefined);
		t.not(repository.query, undefined);
	});
}