/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:16:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:39:59
 */

import { PlatformInitialState } from '../Domain';
import { Platform } from  '../..';
import { ModuleSetupController } from './moduleSetup.controller';

export const PlatformSetupController = (platform: Platform.PlatformInterface) => async (initialState?: PlatformInitialState) => {
	if (initialState === undefined || initialState === null) {
		return Promise.resolve();
	}
	Promise.all([
		ModuleSetupController(platform)(initialState)
	]).then(() => { })
}