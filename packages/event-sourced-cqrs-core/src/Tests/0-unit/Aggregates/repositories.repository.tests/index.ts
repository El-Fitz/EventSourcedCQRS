/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:02:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:03:44
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../"

export { default as Basic } from "./0-basics.tests"
export { default as Create } from "./1-create.tests"
export { default as Get } from "./2-get.tests"
export { default as Delete } from "./3-delete.tests"

import Basic from "./0-basics.tests"
import Create from "./1-create.tests"
import Get from "./2-get.tests"
import Delete from "./3-delete.tests"

export const RunTests = (platform: PlatformInterface) => (test: TestInterface) => {
	Basic(platform)(test)
	Create(platform)(test)
	Get(platform)(test)
	Delete(platform)(test)
}