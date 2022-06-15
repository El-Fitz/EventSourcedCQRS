/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:28:09 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 23:02:05
 */

import { Core } from "event-sourced-cqrs-core";
import { Core as ProjectionsCore } from '../../';
import { Platform } from '../../';
import { PlatformSetupControllerType } from '../Domain';

type InitialStateType = { id: Core.Types.UUID, reducer: ProjectionsCore.Reducers.Reducer }[] | undefined;
export const ProjectionsReducersSetupController: PlatformSetupControllerType<InitialStateType> = (platform: Platform.PlatformInterface) => async (initialState: InitialStateType) => {
	if (initialState === undefined || initialState.length === 0) {
		return Promise.resolve(0);
	}
	const service = platform.Reducers.Service;
	const createdReducers = await Promise.all(initialState.map(({ id, reducer }) => service.create(id, reducer)));
	return Promise.resolve(createdReducers.length);
}