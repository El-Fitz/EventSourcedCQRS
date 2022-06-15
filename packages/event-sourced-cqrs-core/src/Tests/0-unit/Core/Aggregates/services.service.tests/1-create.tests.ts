/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 19:17:35
 */

import { TestFn } from 'ava';

import { Core, Platform } from "../../../../../index.js";
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
				let service = platform.Aggregates.ServicesService;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				await t.notThrows(async () => await service.create(aggregatesRepository));
			});
		};
		return {
			title: 'Aggregates Service Creation succeeds with proper parameter',
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
				let service = platform.Aggregates.ServicesService;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				let createdAggregatesService = await service.create(aggregatesRepository)
				t.is(JSON.stringify(createdAggregatesService), expectedResult as string);
			});
		};
		return {
			title: 'Aggregates Service is returned after creation',
			expectedResult: JSON.stringify(Core.Aggregates.Service(parameters.aggregates.repositories[0])),
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];