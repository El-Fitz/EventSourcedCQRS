/*
* @Author: Thomas Léger 
* @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 18:41:40
*/

import { TestFn } from 'ava';
import { v4 as uuid } from 'uuid';

import { Platform } from "../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';
import { aggregateRepositoryFactory } from "../../../../Factories/Aggregates/_aggregates-repository.factory";

export const testSuites: TestSuite[] = [
	(() => {
		const parameters = {
			aggregates: {
				repositories: [aggregateRepositoryFactory()]
			}
		}
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let repository = platform.Aggregates.RepositoriesRepository;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await repository.create(aggregatesRepository);
				await t.notThrows(async () => await repository.get(aggregatesRepository.id));
			});
		};
		return {
			title: 'Aggregates Repository can be retrieved after creation',
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let repository = platform.Aggregates.RepositoriesRepository;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await repository.create(aggregatesRepository);
				let fetchedRepository = await repository.get(aggregatesRepository.id)
				t.deepEqual(fetchedRepository, expectedResult)
			});
		};
		return {
			title: 'The repository returns the expected Aggregates Repository',
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let repository = platform.Aggregates.RepositoriesRepository;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await repository.create(aggregatesRepository);
				let fetchedRepository = await repository.get(uuid());
				t.deepEqual(fetchedRepository, expectedResult)
			});
		};
		return {
			title: 'The repository returns null when the requested Aggregates Repository does not exist',
			expectedResult: null,
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];