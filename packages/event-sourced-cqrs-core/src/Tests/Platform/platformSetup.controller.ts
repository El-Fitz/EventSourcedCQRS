/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:16:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 18:33:00
 */

import { TestSuiteInitialState } from '../Domain';
import { PlatformInterface } from '../../';
import { ModuleSetupController as AggregatesSetupController } from './Aggregates/moduleSetup.controller';

export const PlatformSetupController = (platform: PlatformInterface) => async (initialState?: TestSuiteInitialState) => {
	if (initialState === undefined || initialState === null) {
		return Promise.resolve();
	}
	Promise.all([
		AggregatesSetupController(platform)(initialState)
	]).then(() => { })
}