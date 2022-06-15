/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:26:53 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:29:41
 */

import { TestFn } from 'ava';

import { Core, Platform } from "../../../../";
import { TestSuite, TestSuiteExpectedResult, TestSuiteParameters } from '../../../Domain';
import { projectionRepositoryFactory } from "../_projections-repository.factory";

export const testSuites: TestSuite[] = [
	(() => {
		const parameters = {
			projections: {
				repositories: [projectionRepositoryFactory()]
			}
		}
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (_expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.ServicesService;
				let [projectionsRepository] = parameters?.projections?.repositories ?? [];
				await t.notThrows(async () => await service.create(projectionsRepository));
			});
		};
		return {
			title: 'Projections Service Creation succeeds with proper parameter',
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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.ServicesService;
				let [projectionsRepository] = parameters?.projections?.repositories ?? [];
				let createdProjectionsService = await service.create(projectionsRepository)
				t.is(JSON.stringify(createdProjectionsService), expectedResult as string);
			});
		};
		return {
			title: 'Projections Service is returned after creation',
			expectedResult: JSON.stringify(Core.Service(parameters.projections.repositories[0])),
			initialState: undefined,
			parameters,
			implementation,
		};
	})(),
];