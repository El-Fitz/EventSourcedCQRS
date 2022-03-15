/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:16:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:10:10
 */

import { PlatformInitialState } from '../Domain';
import { Platform } from  '../..';
import { ModuleSetupController as AggregatesSetupController } from './Aggregates/moduleSetup.controller';

export const PlatformSetupController = (platform: Platform.PlatformInterface) => async (initialState?: PlatformInitialState) => {
	if (initialState === undefined || initialState === null) {
		return Promise.resolve();
	}
	Promise.all([
		AggregatesSetupController(platform)(initialState)
	]).then(() => { })
}