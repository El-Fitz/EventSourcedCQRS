/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:04:18
 */

import test from 'ava';
import Platform from "../../../../src/index.js";

test('Succesfully initializes Aggregates Repositories Repository', t => {
	let repository = Platform.Aggregates.RepositoriesRepository();
	t.not(repository, undefined);
});

test('Aggregates Repositories Repository has the proper methods', t => {
	let repository = Platform.Aggregates.RepositoriesRepository();
	t.not(repository.create, undefined);
	t.not(repository.get, undefined);
	t.not(repository.delete, undefined);
});