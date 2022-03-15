/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:22:48 
 * @Last Modified by:   Thomas Léger 
 * @Last Modified time: 2021-06-17 02:22:48 
 */

import { Core } from "event-sourced-cqrs-core";
import { CommandReducersDefinitionsRepositoryInstance } from "./command-reducers-definitions.repository"

export const CommandReducersDefinitionsService = () => Core.Commands.Reducers.Definitions.Service(CommandReducersDefinitionsRepositoryInstance);