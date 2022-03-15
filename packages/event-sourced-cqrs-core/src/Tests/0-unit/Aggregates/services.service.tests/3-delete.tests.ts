/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:33 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:17:20
 */

import { TestInterface } from 'ava';

import * as Core from "../../../../Core/index.js";
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
				let service = platform.Aggregates.ServicesService;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await service.create(aggregatesRepository);
				await t.notThrows(async () => await service.delete(aggregatesRepository.id));
			});
		};
		return {
			title: 'Aggregates Service can be deleted after creation',
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
				let service = platform.Aggregates.ServicesService;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await service.create(aggregatesRepository);
				await service.delete(aggregatesRepository.id);
				let fetchedDefinition = await service.get(aggregatesRepository.id);
				t.deepEqual(fetchedDefinition, expectedResult)
			});
		};
		return {
			title: 'The repository does not return the Aggregates Service once it has been deleted',
			expectedResult: null,
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];