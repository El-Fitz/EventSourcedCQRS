/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:26:08 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:23:59
 */

import * as Commands from "../.."
import * as Types from "../../../Types";

export interface CommandReducersDefinitionsRepository {
	create: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => Promise<Commands.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Commands.Reducers.Definitions.Definition | null>;
	query: (command: Commands.Command) => Promise<Commands.Reducers.Definitions.Definition[]>;
	delete: (id: Types.UUID) => Promise<void>;
}