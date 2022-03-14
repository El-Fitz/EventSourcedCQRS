/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:03:12
*/

import { TestInterface } from 'ava';
import { v4 as uuid } from 'uuid';

import * as Core from "../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../Domain';
import { aggregateRepositoryFactory } from "../_aggregates-repository.factory";

export const testSuites: TestSuite[] = [
	(() => {
		const parameters = {
			aggregates: {
				repositories: [aggregateRepositoryFactory()]
			}
		}
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Aggregates.RepositoriesRepository;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await repository.create(aggregatesRepository);
				await t.notThrows(async () => await repository.get(aggregatesRepository.id));
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - Aggregates Repository can be retrieved after creation',
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Aggregates.RepositoriesRepository;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await repository.create(aggregatesRepository);
				let fetchedRepository = await repository.get(aggregatesRepository.id)
				t.deepEqual(fetchedRepository, expectedResult)
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - The repository returns the expected Aggregates Repository',
			expectedResult: parameters.aggregates.repositories[0],
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let repository = platform.Aggregates.RepositoriesRepository;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await repository.create(aggregatesRepository);
				let fetchedRepository = await repository.get(uuid());
				t.deepEqual(fetchedRepository, expectedResult)
			});
		};
		return {
			title: 'Agggregates - Repositories Repository - The repository returns null when the requested Aggregates Repository does not exist',
			expectedResult: null,
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];