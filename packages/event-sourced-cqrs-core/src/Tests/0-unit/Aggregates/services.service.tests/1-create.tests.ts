/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:28:37
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Core.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let service = platform.Aggregates.ServicesService;
				let [aggregatesRepository] = parameters?.aggregates?.repositories ?? [];
				let createdAggregatesService = await service.create(aggregatesRepository)
				t.is(JSON.stringify(createdAggregatesService), expectedResult);
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