/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-18 16:40:34
 */

import Types from "../types"
import Commands from "./"

export interface CommandsServiceInterface {
	create: (command: Commands.Command) => Promise<Commands.Command>;
	get: (commandId: Types.UUID) => Promise<Commands.Command | null>;
}

export const CommandsService = (repository: Commands.Repository): CommandsServiceInterface => ({
	create: (command: Commands.Command) => repository.create(command),
	get: (commandId: Types.UUID) => repository.get(commandId),
})