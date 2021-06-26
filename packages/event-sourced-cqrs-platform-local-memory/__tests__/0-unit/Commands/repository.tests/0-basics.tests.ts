/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 19:17:11
 */

import test from 'ava';
import Platform from "../../../../src/index.js"

test('Succesfully initializes Commands Repository', t => {
	let repository = Platform.Commands.Repository()
	t.not(repository, undefined);
});

test('Commands Repository has the proper methods', t => {
	let repository = Platform.Commands.Repository()
	t.not(repository.create, undefined);
	t.not(repository.get, undefined);
});