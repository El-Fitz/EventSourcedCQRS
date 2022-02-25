/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:06:37 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 17:57:02
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../../"

export * as Repository from './repository.tests'
export * as Service from "./service.tests"

import * as Repository from "./repository.tests"
import * as Service from "./service.tests"

export const RunTests = (platform: PlatformInterface) => (test: TestInterface) => {
	Repository.RunTests(platform)(test)
	Service.RunTests(platform)(test)
}