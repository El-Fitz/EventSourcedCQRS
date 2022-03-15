/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 17:05:12 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 17:12:04
 */

import { Core } from '../..';
import { PlatformSetupControllerType } from './platformSetupController.type';

export const PlatformSetupControllerWrapper = <T>(platformSetupController: PlatformSetupControllerType<T>) => (platform: Core.PlatformInterface) => async (initialState: T): Promise<boolean> => {
	const createdItemsCount = await platformSetupController(platform)(initialState);
	const itemsToCreateCount = (() => {
		if (initialState === undefined || initialState === null) {
			return 0;
		}
		if (Array.isArray(initialState)) {
			return initialState.length;
		}
		throw new Error('Illegal use of PlatformSetupControllerWrapper. initialState should be undefined, null, or an Array');
	})();
	return Promise.resolve(itemsToCreateCount === createdItemsCount);
}