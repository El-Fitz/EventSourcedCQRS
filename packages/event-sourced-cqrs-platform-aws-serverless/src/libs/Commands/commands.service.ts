/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 21:11:52 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-18 16:45:52
 */

import * as Core from "event-sourced-cqrs-core";
import { CommandsRepository } from "./commands.repository";

export const CommandsService = (): Core.Commands.ServiceInterface => Core.Commands.Service(CommandsRepository());
