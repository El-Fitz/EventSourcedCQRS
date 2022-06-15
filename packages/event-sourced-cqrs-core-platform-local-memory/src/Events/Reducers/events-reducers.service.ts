/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:40:13 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:59:48
 */

import { Core } from "event-sourced-cqrs-core";
import { EventsReducersRepositoryInstance } from "./events-reducers.repository"

export const EventReducersService = () => Core.Events.Reducers.Service(EventsReducersRepositoryInstance);