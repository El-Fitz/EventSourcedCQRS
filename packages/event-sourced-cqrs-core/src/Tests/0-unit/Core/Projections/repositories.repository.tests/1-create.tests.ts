/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:19:34
*/

import { TestInterface } from 'ava';

import { Platform } from "../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';
import { projectionRepositoryFactory } from "../_projections-repository.factory";

export const testSuites: TestSuite[] = [
	(() => {
		const parameters = {
			projections: {
				repositories: [projectionRepositoryFactory()]
			}
		}
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Projections.RepositoriesRepository;
				let [projectionsRepository] = parameters?.projections?.repositories ?? [];
				await t.notThrows(async () => await repository.create(projectionsRepository));
			});
		};
		return {
			title: 'Projections Repository Creation succeeds with proper parameter',
			expectedResult: null,
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
	(() => {
		const parameters = {
			projections: {
				repositories: [projectionRepositoryFactory()]
			}
		}
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Projections.RepositoriesRepository;
				let [projectionsRepository] = parameters?.projections?.repositories ?? [];
				let createdProjectionsRepository = await repository.create(projectionsRepository)
				t.deepEqual(createdProjectionsRepository, expectedResult)
			});
		};
		return {
			title: 'Projections Repository is returned after creation',
			expectedResult: parameters.projections.repositories[0],
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];