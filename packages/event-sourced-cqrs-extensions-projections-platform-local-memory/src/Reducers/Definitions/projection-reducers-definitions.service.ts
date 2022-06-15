/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 01:04:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 22:36:01
 */

import { Core } from "event-sourced-cqrs-core";
import { ProjectionReducersDefinitionsRepositoryInstance } from "./projection-reducers-definitions.repository"

export const ProjectionReducersDefinitionsService = () => Core.Projections.Reducers.Definitions.Service(ProjectionReducersDefinitionsRepositoryInstance);