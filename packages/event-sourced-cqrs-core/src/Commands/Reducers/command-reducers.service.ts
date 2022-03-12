/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:23:56 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:33:55
 */

import * as Commands from "../";

export interface CommandReducersServiceInterface {
	get: (definition: Commands.Reducers.Definitions.Definition) => Promise<Commands.Reducers.Reducer>;
};

export const CommandReducersService = (repository: Commands.Reducers.Repository): CommandReducersServiceInterface => ({
	get: (definition: Commands.Reducers.Definitions.Definition) => repository.get(definition),
});
