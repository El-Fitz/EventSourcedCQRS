/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:17:05
*/

import { TestInterface } from 'ava';

import { Platform } from "../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";

export const testSuites: TestSuite[] = [
	(() => {
		const parameters = {
			aggregates: {
				repositories: [aggregateRepositoryFactory()]
			}
		}
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Aggregates.RepositoriesRepository;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await t.notThrows(async () => await repository.create(aggregatesRepository));
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - Aggregates Repository Creation succeeds with proper parameter',
			expectedResult: null,
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
	(() => {
		const parameters = {
			aggregates: {
				repositories: [aggregateRepositoryFactory()]
			}
		}
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Aggregates.RepositoriesRepository;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				let createdAggregatesRepository = await repository.create(aggregatesRepository)
				t.deepEqual(createdAggregatesRepository, expectedResult)
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - Aggregates Repository is returned after creation',
			expectedResult: parameters.aggregates.repositories[0],
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];