/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:00:03 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:12:29
 */

import { TestInterface } from 'ava';

export * as Unit from "./0-unit"

import * as Unit from "./0-unit"
import { PlatformInterface } from "../"

export const RunTests = (platform: PlatformInterface) => (test: TestInterface) => {
	Unit.Aggregates.RunTests(platform)(test)
}