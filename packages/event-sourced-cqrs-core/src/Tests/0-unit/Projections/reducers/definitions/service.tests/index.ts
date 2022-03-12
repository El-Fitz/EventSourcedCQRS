/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:02:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-11 23:48:44
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../../../"

export { default as Basic } from "./0-basics.tests"
export { default as Get } from "./1-get.tests"
export { default as Query } from "./2-query.tests"

import Basic from "./0-basics.tests"
import Get from "./1-get.tests"
import Query from "./2-query.tests"

export const RunTests = (platform: PlatformInterface) => (test: TestInterface) => {
	Basic(platform)(test)
	Get(platform)(test)
	Query(platform)(test)
}