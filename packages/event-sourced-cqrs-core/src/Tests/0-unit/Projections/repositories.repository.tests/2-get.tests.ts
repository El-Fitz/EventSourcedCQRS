/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:03:12
*/

import { TestInterface } from 'ava';
import { v4 as uuid } from 'uuid';

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
				await repository.create(projectionsRepository);
				await t.notThrows(async () => await repository.get(projectionsRepository.id));
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - Projections Repository can be retrieved after creation',
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
				let fetchedRepository = await repository.get(projectionsRepository.id)
				t.deepEqual(fetchedRepository, expectedResult)
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - The repository returns the expected Projections Repository',
			expectedResult: parameters.projections.repositories[0],
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
				let fetchedRepository = await repository.get(uuid());
				t.deepEqual(fetchedRepository, expectedResult)
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - The repository returns null when the requested Projections Repository does not exist',
			expectedResult: null,
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];