/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:28:05 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:12:59
 */

import { Core, Platform } from '../../..';
import { PlatformSetupControllerType } from '../../Domain';

type InitialStateType = Core.Aggregates.Reducers.Definitions.Definition[] | undefined;
export const AggregatesReducersDefinitionsSetupController: PlatformSetupControllerType<InitialStateType> = (platform: Platform.PlatformInterface) => async (initialState: InitialStateType) => {
	if (initialState === undefined || initialState.length === 0) {
		return Promise.resolve(0);
	}
	const controller = platform.Aggregates.Reducers.Controller;
	const createdReducersDefinitions = await Promise.all(initialState.map(controller.createDefinition));
	return Promise.resolve(createdReducersDefinitions.length);
}