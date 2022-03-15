/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:03:52 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 13:06:17
 */

import { PlatformFactory } from "./platformFactory.domain";

export interface PlatformTestConfig<T> {
	parameters: T;
	factory: PlatformFactory<T>;
}