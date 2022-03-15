/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:25:35 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 15:54:45
 */

import * as Types from "../../../../Types";

export interface CommandReducerDefinition {
	id: Types.UUID;
	reducerId: Types.UUID;
	triggeringCommandId: Types.UUID;
}