/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-19 17:27:26 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:29:53
 */

import { TestFn } from 'ava';
import { ProjectionsServiceInterface } from '../../../../Core/domain/projections-service.domain';
import { v4 as uuid } from 'uuid';

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
		const implementation = (title: string) => (parameters?: TestSuiteParameters) => (expectedResult?: TestSuiteExpectedResult) => (platform: Platform.PlatformInterface) => (test: TestFn<unknown>) => {
			test(title, async t => {
				let service = platform.ServicesService;
				let [projectionsRepository] = parameters?.projections?.repositories ?? [];
				await service.create(projectionsRepository);
				let fetchedService = await service.get(projectionsRepository.id)
				t.is(JSON.stringify(fetchedService), expectedResult as string);
			});
		};
		return {
			title: 'The service returns the expected Projections Service',
			expectedResult: JSON.stringify(Core.Service(parameters.projections.repositories[0])),
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
				await service.create(projectionsRepository);
				let fetchedService = await service.get(uuid());
				t.is(fetchedService, expectedResult as ProjectionsServiceInterface | null);
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