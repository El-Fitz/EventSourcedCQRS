/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:23:51 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 18:50:56
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
				definitions
				.reduce((acc: Commands.Reducers.Definitions.Definition[], definition) => {
					if (acc.findIndex(({ reducerId }) => reducerId === definition.reducerId) === -1) {
						return acc.concat(definition);
					}
					return acc;
				}, [])
				.map((definition) =>
					reducersService
						.get(definition)
						.then((reducer) => ({ definition, reducer }))
				)
			))
})