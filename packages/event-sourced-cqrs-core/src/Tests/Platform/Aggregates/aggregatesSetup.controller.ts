/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:26:35 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 17:03:17
 */

import { Core, PlatformInterface } from '../../..';
import { PlatformSetupControllerType } from '../../Domain';

type InitialStateType = Core.Aggregates.Aggregate[] | undefined;
export const AggregatesSetupController: PlatformSetupControllerType<InitialStateType> = (platform: PlatformInterface) => async (initialState: InitialStateType) => {
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
			return platform.Aggregates.ServicesService.get(repositoryId);
		})
	)).reduce((acc: { [key: string]: Core.Aggregates.ServiceInterface}, service) => {
		if (service !== null) {
			acc[service.repositoryId] = service;
		}
		return acc;
	}, { });
	const createdAggregates = await Promise.all(initialState.map((aggregate) => services[aggregate.repositoryId].create(aggregate)));
	return Promise.resolve(createdAggregates.length);
}