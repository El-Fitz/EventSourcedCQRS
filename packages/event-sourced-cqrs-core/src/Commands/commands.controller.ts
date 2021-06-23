/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:38:24 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:51:31
 */

import Commands from "./";
import Events from "../Events";

export const CommandsController = (command: Commands.Command) =>
	(commandsService: Commands.ServiceInterface) =>
		(commandReducersDefinitionsService: Commands.Reducers.Definitions.ServiceInterface) =>
		(eventsMessageBus?: Events.MessageBus) =>
		Promise.all([
			commandsService.create(command),
			Commands.Reducer(command)(commandReducersDefinitionsService)
				.then(eventsMessageBus?.emitMultiple)
		]);