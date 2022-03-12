/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:25:43 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-11 23:41:05
 */

import * as Commands from "../../"
import * as Types from "../../../Types";

export interface CommandReducersDefinitionsServiceInterface {
	get: (id: Types.UUID) => Promise<Commands.Reducers.Definitions.Definition | null>;
	query: (command: Commands.Command) => Promise<Commands.Reducers.Definitions.Definition[]>;
};

export const CommandReducersDefinitionsService = (repository: Commands.Reducers.Definitions.Repository): CommandReducersDefinitionsServiceInterface => ({
	get: (id: Types.UUID) => repository.get(id),
	query: (command: Commands.Command) => repository.query(command),
});
