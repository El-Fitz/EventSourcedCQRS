/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:02:41 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:21:31
 */

import { Platform } from "..";

export type PlatformFactory<T> = (parameters: T) => Platform.PlatformInterface;