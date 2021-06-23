/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:12 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-18 16:40:29
 */

import Types from "../types";
import Commands from "./"

export interface CommandsRepository {
	create: (command: Commands.Command) => Promise<Commands.Command>;
	get: (commandId: Types.UUID) => Promise<Commands.Command | null>;
}