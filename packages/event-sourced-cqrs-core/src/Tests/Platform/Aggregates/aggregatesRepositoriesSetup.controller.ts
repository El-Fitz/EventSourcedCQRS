/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:28:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 17:03:10
 */

import { Core, PlatformInterface } from '../../../';
import { PlatformSetupControllerType } from '../../Domain';

type InitialStateType = Core.Aggregates.Repository[] | undefined;
export const AggregatesRepositoriesSetupController: PlatformSetupControllerType<InitialStateType> = (platform: PlatformInterface) => async (initialState: InitialStateType) => {
	if (initialState === undefined || initialState.length === 0) {
		return Promise.resolve(0);
	}
	const service = platform.Aggregates.ServicesService;
	const createdServices = await Promise.all(initialState.map((repository) => service.create(repository)));
	return Promise.resolve(createdServices.length);
}