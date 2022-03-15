/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:28:09 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 17:03:04
 */

import { Core, PlatformInterface } from '../../../';
import { PlatformSetupControllerType } from '../../Domain';

type InitialStateType = { id: Core.Types.UUID, reducer: Core.Aggregates.Reducers.Reducer }[] | undefined;
export const AggregatesReducersSetupController: PlatformSetupControllerType<InitialStateType> = (platform: PlatformInterface) => async (initialState: InitialStateType) => {
	if (initialState === undefined || initialState.length === 0) {
		return Promise.resolve(0);
	}
	const service = platform.Aggregates.Reducers.Service;
	const createdReducers = await Promise.all(initialState.map(({ id, reducer }) => service.create(id, reducer)));
	return Promise.resolve(createdReducers.length);
}