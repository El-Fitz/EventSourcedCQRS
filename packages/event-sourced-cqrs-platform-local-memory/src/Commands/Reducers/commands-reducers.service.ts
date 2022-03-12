/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:40:13 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:41:08
 */

import * as Core from "event-sourced-cqrs-core";
import { CommandsReducersRepositoryInstance } from "./commands-reducers.repository"

export const CommandReducersService = () => Core.Commands.Reducers.Service(CommandsReducersRepositoryInstance);