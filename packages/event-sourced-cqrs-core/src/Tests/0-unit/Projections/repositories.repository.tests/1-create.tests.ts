/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 18:59:43
*/

import { TestInterface } from 'ava';

import * as Core from "../../../../Core/index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../Domain';
import { projectionRepositoryFactory } from "../_projections-repository.factory";

export const testSuites: TestSuite[] = [
	(() => {
		const parameters = {
			projections: {
				repositories: [projectionRepositoryFactory()]
			}
		}
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Projections.RepositoriesRepository;
				let [projectionsRepository] = parameters?.projections?.repositories ?? [];
				await t.notThrows(async () => await repository.create(projectionsRepository));
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - Projections Repository Creation succeeds with proper parameter',
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Projections.RepositoriesRepository;
				let [projectionsRepository] = parameters?.projections?.repositories ?? [];
				let createdProjectionsRepository = await repository.create(projectionsRepository)
				t.deepEqual(createdProjectionsRepository, expectedResult)
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - Projections Repository is returned after creation',
			expectedResult: parameters.projections.repositories[0],
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];