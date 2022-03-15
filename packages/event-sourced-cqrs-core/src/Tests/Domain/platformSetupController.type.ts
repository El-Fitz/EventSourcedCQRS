/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 15:23:35 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 17:05:39
 */

import { PlatformInterface } from '../..';

export type PlatformSetupControllerType<T> = (platform: PlatformInterface) => (initialState: T) => Promise<number>;