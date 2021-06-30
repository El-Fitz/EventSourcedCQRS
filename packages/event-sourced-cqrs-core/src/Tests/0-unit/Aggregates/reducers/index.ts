/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:13:27 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 02:15:47
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../../"

export * as Definitions from './definitions'

import * as Definitions from "./definitions"

export const RunTests = (platform: PlatformInterface) => (test: TestInterface) => {
	Definitions.RunTests(platform)(test)
}