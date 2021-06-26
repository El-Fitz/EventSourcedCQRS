/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:25:43 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 18:37:55
 */

import Commands from "./"
import Types from "../types";

export interface CommandReducersDefinitionsServiceInterface {
	create: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => Promise<Commands.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Commands.Reducers.Definitions.Definition | null>;
	query: (command: Commands.Command) => Promise<Commands.Reducers.Definitions.Definition[]>;
	delete: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => Promise<void>;
};

export const CommandReducersDefinitionsService = (repository: Commands.Reducers.Definitions.Repository): CommandReducersDefinitionsServiceInterface => ({
	create: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => repository.create(commandReducerDefinition),
	get: (id: Types.UUID) => repository.get(id),
	query: (command: Commands.Command) => repository.query(command),
	delete: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => repository.delete(commandReducerDefinition),
});
