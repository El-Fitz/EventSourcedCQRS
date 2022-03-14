/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:16:52 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:19:55
 */

export * as Reducers from "./reducers"
export * as RepositoriesRepository from "./repositories.repository.tests"
export * as ServicesService from "./services.service.tests"

import * as Reducers from "./reducers"
import * as RepositoriesRepository from "./repositories.repository.tests"
import * as ServicesService from "./services.service.tests"

export const TestSuites = [
	...Reducers.TestSuites,
	...RepositoriesRepository.TestSuites,
	...ServicesService.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[AGGREGATES] - ${testSuite.title}`
}));;
