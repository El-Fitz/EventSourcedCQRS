/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-26 16:22:08 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 16:25:03
 */

import test from 'ava';
import Platform from "../../../../src/index.js";

test('Commands Message Bus Creation succeeds', async t => {
	let messageBus = Platform.Commands.MessageBus()
	t.not(messageBus, undefined);
});

test('Commands Message Bus has the proper methods', async t => {
	let messageBus = Platform.Commands.MessageBus()
	t.not(messageBus.subscribe, undefined);
	t.not(messageBus.unsubscribe, undefined);
	t.not(messageBus.emit, undefined);
	t.not(messageBus.emitMultiple, undefined);
});
