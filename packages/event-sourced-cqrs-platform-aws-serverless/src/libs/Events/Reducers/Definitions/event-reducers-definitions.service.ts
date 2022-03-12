/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-18 16:33:32 
 * @Last Modified by:   Thomas Léger 
 * @Last Modified time: 2021-06-18 16:33:32 
 */

import * as Core from "event-sourced-cqrs-core";
import { EventReducersDefinitionsRepositoryInstance } from "./event-reducers-definitions.repository"

export const EventReducersDefinitionsService = () => Core.Events.Reducers.Definitions.Service(EventReducersDefinitionsRepositoryInstance);