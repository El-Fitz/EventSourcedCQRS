/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:03:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 02:17:13
 */

import { Core } from "event-sourced-cqrs-core";
import { ProjectionsRepositoriesRepositoryInstance } from "./projections-repositories.repository";

export const ProjectionsServicesService = () => Core.Projections.ServicesService(ProjectionsRepositoriesRepositoryInstance);