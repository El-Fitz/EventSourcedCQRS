/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:38:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:46:45
 */

import test from 'ava';
import Platform from "../../../../../../src/index.js";

test('Succesfully initializes Reducers Definitions Service', t => {
	let service = Platform.Aggregates.Reducers.Definitions.Service()
	t.not(service, undefined);
});

test('Reducers Definitions Service has the proper methods', t => {
	let service = Platform.Aggregates.Reducers.Definitions.Service()
	t.not(service.create, undefined);
	t.not(service.get, undefined);
	t.not(service.query, undefined);
	t.not(service.delete, undefined);
});