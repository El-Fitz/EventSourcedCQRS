/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:23:54 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:33:29
 */

import * as Commands from "../";

export interface CommandReducersRepository {
	get: (definition: Commands.Reducers.Definitions.Definition) => Promise<Commands.Reducers.Reducer>;
}