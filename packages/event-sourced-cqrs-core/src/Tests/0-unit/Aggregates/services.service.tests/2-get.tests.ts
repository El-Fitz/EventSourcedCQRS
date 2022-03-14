/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:30:20
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
				let service = platform.Aggregates.ServicesService;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await service.create(aggregatesRepository);
				await t.notThrows(async () => await service.get(aggregatesRepository.id));
			});
		};
		return {
			title: 'Aggregates Service can be retrieved after creation',
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
				let fetchedService = await service.get(aggregatesRepository.id)
				t.is(JSON.stringify(fetchedService), expectedResult);
			});
		};
		return {
			title: 'The service returns the expected Aggregates Service',
			expectedResult: JSON.stringify(Core.Aggregates.Service(parameters.aggregates.repositories[0])),
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
				let fetchedService = await service.get(uuid());
				t.is(fetchedService, expectedResult);
			});
		};
		return {
			title: 'The service returns null when the requested Aggregates Service does not exist',
			expectedResult: null,
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];