/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:23:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:14:04
 */

import { Platform } from '../../..';
import { AggregatesSetupController } from './aggregatesSetup.controller';
import { AggregatesReducersSetupController } from './aggregatesReducerSetup.controller';
import { AggregatesReducersDefinitionsSetupController } from './aggregatesReducersDefinitionsSetup.controller';
import { AggregatesRepositoriesSetupController } from './aggregatesRepositoriesSetup.controller';
import { PlatformSetupControllerWrapper, PlatformInitialState } from '../../Domain';

export const ModuleSetupController = (platform: Platform.PlatformInterface) => async (initialState: PlatformInitialState) => {
	const { aggregates: aggregatesInitialState } = initialState;
	if (aggregatesInitialState === undefined) {
		return Promise.resolve(0);
	}
	const [reducers, repositories] = await Promise.all([
		PlatformSetupControllerWrapper(AggregatesReducersSetupController)(platform)(aggregatesInitialState.reducers),
		PlatformSetupControllerWrapper(AggregatesRepositoriesSetupController)(platform)(aggregatesInitialState.repositories),
	]);
	const [aggregates, reducersDefinitions] = await Promise.all([
		PlatformSetupControllerWrapper(AggregatesSetupController)(platform)(aggregatesInitialState.items),
		PlatformSetupControllerWrapper(AggregatesReducersDefinitionsSetupController)(platform)(aggregatesInitialState.reducersDefinitions)
	]); 
	return Promise.resolve(reducers && repositories && aggregates && reducersDefinitions);
}