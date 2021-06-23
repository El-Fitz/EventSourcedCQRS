/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-18 16:47:53 
 * @Last Modified by:   Thomas Léger 
 * @Last Modified time: 2021-06-18 16:47:53 
 */

import Core from "event-sourced-cqrs-core";
import { EventsRepository } from "./events.repository";

export const EventsService = (): Core.Events.ServiceInterface => Core.Events.Service(EventsRepository());
