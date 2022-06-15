/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:16:52 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:33:32
 */

import * as Reducers from "./reducers"
import * as RepositoriesRepository from "./repositories.repository.tests"
import * as ServicesService from "./services.service.tests"

export { Reducers, RepositoriesRepository, ServicesService };

export const TestSuites = [
	...Reducers.TestSuites,
	...RepositoriesRepository.TestSuites,
	...ServicesService.TestSuites
].map((testSuite) => ({
	...testSuite,
	title: `[PROJECTIONS] - ${testSuite.title}`
}));;
