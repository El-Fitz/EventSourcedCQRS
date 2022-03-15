/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:28:05 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 17:02:40
 */

import { Core, PlatformInterface } from '../../../';
import { PlatformSetupControllerType } from '../../Domain';

type InitialStateType = Core.Aggregates.Reducers.Definitions.Definition[] | undefined;
export const AggregatesReducersDefinitionsSetupController: PlatformSetupControllerType<InitialStateType> = (platform: PlatformInterface) => async (initialState: InitialStateType) => {
	if (initialState === undefined || initialState.length === 0) {
		return Promise.resolve(0);
	}
	const controller = platform.Aggregates.Reducers.Controller;
	const createdReducersDefinitions = await Promise.all(initialState.map(controller.createDefinition));
	return Promise.resolve(createdReducersDefinitions.length);
}