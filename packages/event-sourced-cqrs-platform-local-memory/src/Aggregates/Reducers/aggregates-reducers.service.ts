/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:40:37 
 * @Last Modified by:   Thomas Léger 
 * @Last Modified time: 2022-03-12 17:40:37 
 */

import * as Core from "event-sourced-cqrs-core";
import { AggregatesReducersRepositoryInstance } from "./aggregates-reducers.repository"

export const AggregateReducersService = () => Core.Aggregates.Reducers.Service(AggregatesReducersRepositoryInstance);