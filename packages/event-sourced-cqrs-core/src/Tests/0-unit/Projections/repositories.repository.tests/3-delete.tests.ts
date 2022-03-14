/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:05:07
 */

import { TestInterface } from 'ava';

import * as Core from "../../../../index.js";
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
				await repository.create(projectionsRepository);
				await t.notThrows(async () => await repository.delete(projectionsRepository.id));
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - Projections Repository can be deleted after creation',
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
				await repository.create(projectionsRepository);
				await repository.delete(projectionsRepository.id);
				let fetchedDefinition = await repository.get(projectionsRepository.id);
				t.deepEqual(fetchedDefinition, expectedResult)
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - The repository does not return the Projections Repository once it has been deleted',
			expectedResult: null,
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];