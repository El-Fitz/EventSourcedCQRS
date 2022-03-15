/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:03:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 01:12:59
 */

import { Core } from "event-sourced-cqrs-core";

export const ProjectionsRepositoriesRepository = (): Core.Projections.RepositoriesRepository => {

	let repository: { [key: string]: Core.Projections.Repository } =  { };

	return ({
		create: (projectionsRepository: Core.Projections.Repository) => {
			repository[projectionsRepository.id] = projectionsRepository;
			return Promise.resolve(projectionsRepository);
		},
		get: (id: Core.Types.UUID) => {
			const result = repository[id];
			return Promise.resolve(result ?? null)
		},
		delete: (projectionRepositoryId: Core.Types.UUID) => {
			delete repository[projectionRepositoryId]
			return Promise.resolve();
		}
	})
}

export const ProjectionsRepositoriesRepositoryInstance = ProjectionsRepositoriesRepository();