/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:31:59
 */

import * as Commands from "./"

export const CommandsReducer = (command: Commands.Command) =>
	(commandsReducersController: Commands.Reducers.ControllerInterface) =>
		commandsReducersController
			.query(command)
			.then((definitionsWithReducers) => 
				Promise.all(
					definitionsWithReducers.map(({ reducer }) => reducer(command) )
				)
			)
			.then((eventPromises) => eventPromises.flatMap((eventPromise) => eventPromise));
