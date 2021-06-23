/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:19:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-19 17:19:34
 */

import test from 'ava';

const fn = () => 'foo';

test('fn() returns foo', t => {
	t.is(fn(), 'foo');
});