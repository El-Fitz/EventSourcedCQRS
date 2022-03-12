/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:40:37 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 18:06:36
 */

import * as Core from "event-sourced-cqrs-core";
import { ProjectionsReducersRepositoryInstance } from "./projections-reducers.repository"

export const ProjectionReducersService = () => Core.Projections.Reducers.Service(ProjectionsReducersRepositoryInstance);