/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:25:43 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:24:04
 */

import * as Commands from "../../"
import * as Types from "../../../Types";

export interface CommandReducersDefinitionsServiceInterface {
	create: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => Promise<Commands.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Commands.Reducers.Definitions.Definition | null>;
	query: (command: Commands.Command) => Promise<Commands.Reducers.Definitions.Definition[]>;
	delete: (id: Types.UUID) => Promise<void>;
};

export const CommandReducersDefinitionsService = (repository: Commands.Reducers.Definitions.Repository): CommandReducersDefinitionsServiceInterface => ({
	create: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => repository.create(commandReducerDefinition),
	get: (id: Types.UUID) => repository.get(id),
	query: (command: Commands.Command) => repository.query(command),
	delete: (id: Types.UUID) => repository.delete(id),
});
