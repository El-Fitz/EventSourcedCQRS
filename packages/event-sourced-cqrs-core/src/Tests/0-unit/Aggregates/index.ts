/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:16:52 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 18:11:32
 */

import { TestInterface } from 'ava';
import { PlatformInterface } from "../../../"

export * as Reducers from "./reducers"
export * as RepositoriesRepository from "./repositories.repository.tests"
export * as ServicesService from "./services.service.tests"

import * as Reducers from "./reducers"
import * as RepositoriesRepository from "./repositories.repository.tests"
import * as ServicesService from "./services.service.tests"

export const RunTests = (platform: PlatformInterface) => (test: TestInterface) => {
	Reducers.RunTests(platform)(test)
	RepositoriesRepository.RunTests(platform)(test)
	ServicesService.RunTests(platform)(test)
}
