/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:38:24 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:32:23
 */

import * as Commands from "./";
import * as Events from "../Events";

export const CommandsController = (command: Commands.Command) =>
	(commandsService: Commands.ServiceInterface) =>
		(commandReducersController: Commands.Reducers.ControllerInterface) =>
		(eventsMessageBus?: Events.MessageBus) =>
		Promise.all([
			commandsService.create(command),
			Commands.Reducer(command)(commandReducersController)
				.then(eventsMessageBus?.emitMultiple)
		]);