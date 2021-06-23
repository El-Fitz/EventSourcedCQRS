/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:30:31
 */

import test from 'ava';
import Platform from "../../../../src/index.js";

test('Succesfully initializes Aggregates Services Service', t => {
	let service = Platform.Aggregates.ServicesService();
	t.not(service, undefined);
});

test('Aggregates Services Service has the proper methods', t => {
	let service = Platform.Aggregates.ServicesService();
	t.not(service.create, undefined);
	t.not(service.get, undefined);
	t.not(service.delete, undefined);
});