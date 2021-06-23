/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:54:22
 */

import Commands from "./"

export interface CommandsMessageBus {
	emit: (command: Commands.Command) => Promise<void>;
	emitMultiple: (commands: Commands.Command[]) => Promise<void>;
}