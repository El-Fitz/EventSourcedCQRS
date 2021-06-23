/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:23:19 
 * @Last Modified by:   Thomas Léger 
 * @Last Modified time: 2021-06-19 17:23:19 
 */

import test from 'ava';

const fn = () => 'foo';

test('fn() returns foo', t => {
	t.is(fn(), 'foo');
});