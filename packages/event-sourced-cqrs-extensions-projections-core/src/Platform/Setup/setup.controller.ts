/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:26:35 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 23:02:27
 */

import { Core as ProjectionsCore } from '../../';
import { Platform } from '../../';
import { PlatformSetupControllerType } from '../Domain';

type InitialStateType = ProjectionsCore.Projection[] | undefined;
export const ProjectionsSetupController: PlatformSetupControllerType<InitialStateType> = (platform: Platform.PlatformInterface) => async (initialState: InitialStateType) => {
	if (initialState === undefined || initialState.length === 0) {
		return Promise.resolve(0);
	}
	const services = (await Promise.all(
		initialState.reduce((acc: string[], { repositoryId }) => {
			if (acc.findIndex((item) => item === repositoryId) === -1) {
				return acc.concat(repositoryId);
			}
			return acc;
		}, []).map(async (repositoryId) => {
			return platform.ServicesService.get(repositoryId);
		})
	)).reduce((acc: { [key: string]: ProjectionsCore.ServiceInterface}, service) => {
		if (service !== null) {
			acc[service.repositoryId] = service;
		}
		return acc;
	}, { });
	const createdProjections = await Promise.all(initialState.map((projection) => services[projection.repositoryId].create(projection)));
	return Promise.resolve(createdProjections.length);
}