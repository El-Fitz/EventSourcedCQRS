/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:28:05 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 23:02:33
 */

import { Core as ProjectionsCore } from '../../';
import { Platform } from '../../';
import { PlatformSetupControllerType } from '../Domain';

type InitialStateType = ProjectionsCore.Reducers.Definitions.Definition[] | undefined;
export const ProjectionsReducersDefinitionsSetupController: PlatformSetupControllerType<InitialStateType> = (platform: Platform.PlatformInterface) => async (initialState: InitialStateType) => {
	if (initialState === undefined || initialState.length === 0) {
		return Promise.resolve(0);
	}
	const controller = platform.Reducers.Controller;
	const createdReducersDefinitions = await Promise.all(initialState.map(controller.createDefinition));
	return Promise.resolve(createdReducersDefinitions.length);
}