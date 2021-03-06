/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 20:11:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:16:08
 */

import * as Projections from ".";
import * as Types from "../Types";

export interface ProjectionsRepositoriesServiceInterface {
	create: (projectionsRepository: Projections.Repository) => Promise<Projections.ServiceInterface>;
	get: (projectionRepositoryId: Types.UUID) => Promise<Projections.ServiceInterface | null>;
	delete: (projectionsRepositoryId: Types.UUID) => Promise<void>;
}

export const ProjectionsRepositoriesService = (repository: Projections.RepositoriesRepository): ProjectionsRepositoriesServiceInterface => ({
	create: (projectionsRepository: Projections.Repository) => repository.create(projectionsRepository).then(Projections.Service),
	get: (projectionRepositoryId: Types.UUID)=> repository.get(projectionRepositoryId).then((repository) => repository === null ? null : Projections.Service(repository)),
	delete: (projectionsRepositoryId: Types.UUID) => repository.delete(projectionsRepositoryId)
})