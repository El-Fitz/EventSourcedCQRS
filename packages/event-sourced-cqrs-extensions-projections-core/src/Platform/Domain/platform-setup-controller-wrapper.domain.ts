/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 17:05:12 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:36:37
 */

import { Platform } from '../..';
import { PlatformSetupControllerType } from './platform-setup-controller.type';

export const PlatformSetupControllerWrapper = <T>(platformSetupController: PlatformSetupControllerType<T>) => (platform: Platform.PlatformInterface) => async (initialState: T): Promise<boolean> => {
	const createdItemsCount = await platformSetupController(platform)(initialState);
	const itemsToCreateCount = (() => {
		if (initialState === undefined || initialState === null) {
			return 0;
		}
		if (Array.isArray(initialState)) {
			return initialState.length;
		}
		throw new Error('Illegal use of PlatformSetupControllerWrapper. "initialState" should be undefined, null, or an Array');
	})();
	return Promise.resolve(itemsToCreateCount === createdItemsCount);
}