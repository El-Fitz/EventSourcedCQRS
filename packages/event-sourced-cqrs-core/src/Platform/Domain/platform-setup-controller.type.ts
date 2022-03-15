/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 15:23:35 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:09:39
 */

import { Platform } from '../..';

export type PlatformSetupControllerType<T> = (platform: Platform.PlatformInterface) => (initialState: T) => Promise<number>;