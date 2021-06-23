/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:51:36
 */

import Commands from "./"

export const CommandsReducer = (command: Commands.Command) => 
	(commandReducersDefinitionsService: Commands.Reducers.Definitions.ServiceInterface) =>
			commandReducersDefinitionsService
				.query(command)
				.then((commandReducersDefinition) => 
					Promise.all(
						commandReducersDefinition.map((commandReducerDefintion) => commandReducerDefintion.reducer().then((commandReducer) => commandReducer(command)))
					)
				)
				.then((eventPromises) => eventPromises.flatMap((eventPromise) => eventPromise));
