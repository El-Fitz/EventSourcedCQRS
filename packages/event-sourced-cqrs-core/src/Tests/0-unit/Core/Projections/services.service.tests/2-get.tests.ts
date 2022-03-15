/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:20:09
 */

import { TestInterface } from 'ava';
import { v4 as uuid } from 'uuid';

import { Core, Platform } from "../../../../../index.js";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../../Domain';
import { projectionRepositoryFactory } from "../_projections-repository.factory";

export const testSuites: TestSuite[] = [
	(() => {
		const parameters = {
			projections: {
				repositories: [projectionRepositoryFactory()]
			}
		}
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let service = platform.Projections.ServicesService;
				let [projectionsRepository] = parameters?.projections?.repositories ?? [];
				await service.create(projectionsRepository);
				await t.notThrows(async () => await service.get(projectionsRepository.id));
			});
		};
		return {
			title: 'Projections Service can be retrieved after creation',
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let service = platform.Projections.ServicesService;
				let [projectionsRepository] = parameters?.projections?.repositories ?? [];
				await service.create(projectionsRepository);
				let fetchedService = await service.get(projectionsRepository.id)
				t.is(JSON.stringify(fetchedService), expectedResult);
			});
		};
		return {
			title: 'The service returns the expected Projections Service',
			expectedResult: JSON.stringify(Core.Projections.Service(parameters.projections.repositories[0])),
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestInterface<unknown>) => {
			test(title, async t => {
				let service = platform.Projections.ServicesService;
				let [projectionsRepository] = parameters?.projections?.repositories ?? [];
				await service.create(projectionsRepository);
				let fetchedService = await service.get(uuid());
				t.is(fetchedService, expectedResult);
			});
		};
		return {
			title: 'The service returns null when the requested Projections Service does not exist',
			expectedResult: null,
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];