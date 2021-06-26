/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:26:08 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 18:36:42
 */

import Commands from "./"
import Types from "../types";

export interface CommandReducersDefinitionsRepository {
	create: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => Promise<Commands.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Commands.Reducers.Definitions.Definition | null>;
	query: (command: Commands.Command) => Promise<Commands.Reducers.Definitions.Definition[]>;
	delete: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => Promise<void>;
}