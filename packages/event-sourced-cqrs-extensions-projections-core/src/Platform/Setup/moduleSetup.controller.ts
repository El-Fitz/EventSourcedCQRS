/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:23:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 23:16:25
 */

import { Platform } from '../../';
import { ProjectionsSetupController } from './setup.controller';
import { ProjectionsReducersSetupController } from './reducerSetup.controller';
import { ProjectionsReducersDefinitionsSetupController } from './reducersDefinitionsSetup.controller';
import { ProjectionsRepositoriesSetupController } from './repositoriesSetup.controller';
import { PlatformSetupControllerWrapper, PlatformInitialState } from '../Domain';

export const ModuleSetupController = (platform: Platform.PlatformInterface) => async (initialState: PlatformInitialState) => {
	const { projections: projectionsInitialState } = initialState;
	if (projectionsInitialState === undefined) {
		return Promise.resolve(0);
	}
	const [reducers, repositories] = await Promise.all([
		PlatformSetupControllerWrapper(ProjectionsReducersSetupController)(platform)(projectionsInitialState.reducers),
		PlatformSetupControllerWrapper(ProjectionsRepositoriesSetupController)(platform)(projectionsInitialState.repositories),
	]);
	const [projections, reducersDefinitions] = await Promise.all([
		PlatformSetupControllerWrapper(ProjectionsSetupController)(platform)(projectionsInitialState.items),
		PlatformSetupControllerWrapper(ProjectionsReducersDefinitionsSetupController)(platform)(projectionsInitialState.reducersDefinitions)
	]); 
	return Promise.resolve(reducers && repositories && projections && reducersDefinitions);
}