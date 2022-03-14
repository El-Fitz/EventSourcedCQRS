/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:16:52 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:36:43
 */

export * as Reducers from "./reducers"
export * as RepositoriesRepository from "./repositories.repository.tests"
export * as ServicesService from "./services.service.tests"

import * as Reducers from "./reducers"
import * as RepositoriesRepository from "./repositories.repository.tests"
import * as ServicesService from "./services.service.tests"

export const TestSuites = [
	...Reducers.RunTests,
	...RepositoriesRepository.TestSuites,
	...ServicesService.TestSuites
];
