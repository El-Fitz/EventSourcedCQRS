/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 22:36:40
 */

import test from 'ava';
import Platform from "../../../../../../src/index.js";

test('Succesfully initializes Reducers Definitions Repository', t => {
	let repository = Platform.Aggregates.Reducers.Definitions.Repository();
	t.not(repository, undefined);
});

test('Reducers Definitions Repository has the proper methods', t => {
	let repository = Platform.Aggregates.Reducers.Definitions.Repository();
	t.not(repository.create, undefined);
	t.not(repository.get, undefined);
	t.not(repository.query, undefined);
	t.not(repository.delete, undefined);
});