/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:12 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 00:54:38
 */

import * as Types from "../types";
import * as Commands from "./"

export interface CommandsRepository {
	create: (command: Commands.Command) => Promise<Commands.Command>;
	get: (commandId: Types.UUID, commandInstanceId: Types.UUID) => Promise<Commands.Command | null>;
}