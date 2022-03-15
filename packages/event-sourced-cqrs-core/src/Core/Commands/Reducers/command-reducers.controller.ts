/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:23:51 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:33:43
 */

import * as Commands from "../";

export interface CommandsReducersControllerInterface {
	createDefinition: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => Promise<Commands.Reducers.Definitions.Definition>;
	query: (command: Commands.Command) => Promise<{ definition: Commands.Reducers.Definitions.Definition, reducer: Commands.Reducers.Reducer }[]>;
}

export const CommandsReducersController =
(reducersDefinitionsService: Commands.Reducers.Definitions.ServiceInterface) =>
(reducersService: Commands.Reducers.ServiceInterface): CommandsReducersControllerInterface => ({
	createDefinition: (commandReducerDefinition: Commands.Reducers.Definitions.Definition) => 
		reducersService
			.get(commandReducerDefinition)
			.catch(() => Promise.reject("Could not retrieve reducer for definition while creating definition"))
			.then(() => reducersDefinitionsService.create(commandReducerDefinition)),
	query: (command: Commands.Command) =>
		reducersDefinitionsService
			.query(command)
			.then((definitions) => Promise.all(
				definitions.map((definition) =>
					reducersService
						.get(definition)
						.then((reducer) => ({ definition, reducer }))
				)
			))
})