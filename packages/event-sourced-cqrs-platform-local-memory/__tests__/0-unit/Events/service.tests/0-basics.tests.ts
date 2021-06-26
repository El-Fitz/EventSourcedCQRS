/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 19:22:58
 */

import test from 'ava';
import Platform from "../../../../src/index.js"

test('Succesfully initializes Events Service', t => {
	let service = Platform.Events.Service()
	t.not(service, undefined);
});

test('Events Service has the proper methods', t => {
	let service = Platform.Events.Service()
	t.not(service.create, undefined);
	t.not(service.get, undefined);
});