/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:26:08 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-11 23:40:59
 */

import * as Commands from "../.."
import * as Types from "../../../Types";

export interface CommandReducersDefinitionsRepository {
	get: (id: Types.UUID) => Promise<Commands.Reducers.Definitions.Definition | null>;
	query: (command: Commands.Command) => Promise<Commands.Reducers.Definitions.Definition[]>;
}