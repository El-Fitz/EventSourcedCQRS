/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 13:02:41 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 13:04:46
 */

import * as Core from "../../Core";

export type PlatformFactory<T> = (parameters: T) => Core.PlatformInterface;