/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 21:11:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-18 16:42:34
 */

import Core from "event-sourced-cqrs-core";

export const CommandsRepository = (): Core.Commands.Repository => {
	let repository: { [key: string]: Core.Commands.Command } = { };

	return {
		create: (command: Core.Commands.Command) => {
			repository[command.id] = command;
			return Promise.resolve(command);
		},
		get: (commandId: Core.Types.UUID) => {
			const command = repository[commandId];
			if (command === undefined) {
				return Promise.resolve(null);
			}
			return Promise.resolve(command);
		}
	}
}