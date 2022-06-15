/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:03:52 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:22:40
 */

import { Platform } from "../../";

export interface PlatformTestConfig<T> {
	parameters: T;
	factory: Platform.PlatformFactory<T>;
}