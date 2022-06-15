/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 18:41:55
 */

import { TestFn } from 'ava';

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
				await t.notThrows(async () => await repository.delete(aggregatesRepository.id));
			});
		};
		return {
			title: 'Aggregates Repository can be deleted after creation',
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
				await repository.delete(aggregatesRepository.id);
				let fetchedDefinition = await repository.get(aggregatesRepository.id);
				t.deepEqual(fetchedDefinition, expectedResult)
			});
		};
		return {
			title: 'The repository does not return the Aggregates Repository once it has been deleted',
			expectedResult: null,
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];