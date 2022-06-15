/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 20:11:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 23:08:30
 */

import { Core } from "event-sourced-cqrs-core";
import * as Projections from ".";

export interface ProjectionsRepositoriesServiceInterface {
	create: (projectionsRepository: Projections.Repository) => Promise<Projections.ServiceInterface>;
	get: (projectionRepositoryId: Core.Types.UUID) => Promise<Projections.ServiceInterface | null>;
	delete: (projectionsRepositoryId: Core.Types.UUID) => Promise<void>;
}

export const ProjectionsRepositoriesService = (repository: Projections.RepositoriesRepository): ProjectionsRepositoriesServiceInterface => ({
	create: (projectionsRepository: Projections.Repository) => repository.create(projectionsRepository).then(Projections.Service),
	get: (projectionRepositoryId: Core.Types.UUID)=> repository.get(projectionRepositoryId).then((repository) => repository === null ? null : Projections.Service(repository)),
	delete: (projectionsRepositoryId: Core.Types.UUID) => repository.delete(projectionsRepositoryId)
})