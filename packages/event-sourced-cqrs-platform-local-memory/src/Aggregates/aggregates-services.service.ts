/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:03:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 02:17:13
 */

import * as Core from "event-sourced-cqrs-core";
import { AggregatesRepositoriesRepositoryInstance } from "./aggregates-repositories.repository";

export const AggregatesServicesService = () => Core.Aggregates.ServicesService(AggregatesRepositoriesRepositoryInstance);