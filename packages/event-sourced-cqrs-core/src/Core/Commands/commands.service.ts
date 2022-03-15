/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 00:54:07
 */

import * as Types from "../Types"
import * as Commands from "./"

export interface CommandsServiceInterface {
	create: (command: Commands.Command) => Promise<Commands.Command>;
	get: (commandId: Types.UUID, commandInstanceId: Types.UUID) => Promise<Commands.Command | null>;
}

export const CommandsService = (repository: Commands.Repository): CommandsServiceInterface => ({
	create: (command: Commands.Command) => repository.create(command),
	get: (commandId: Types.UUID, commandInstanceId: Types.UUID) => repository.get(commandId, commandInstanceId),
})