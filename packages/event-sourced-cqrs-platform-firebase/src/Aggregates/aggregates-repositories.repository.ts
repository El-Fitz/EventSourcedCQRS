/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:03:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 02:16:25
 */

import Core from "event-sourced-cqrs-core";

export const AggregatesRepositoriesRepository = (): Core.Aggregates.RepositoriesRepository => {

	let repository: { [key: string]: Core.Aggregates.Repository } =  { };

	return ({
		create: (aggregatesRepository: Core.Aggregates.Repository) => {
			repository[aggregatesRepository.id] = aggregatesRepository;
			return Promise.resolve(aggregatesRepository);
		},
		get: (id: Core.Types.UUID) => Promise.resolve(repository[id]),
		delete: (aggregateRepositoryId: Core.Types.UUID) => {
			delete repository[aggregateRepositoryId]
			return Promise.resolve();
		}
	})
}

export const AggregatesRepositoriesRepositoryInstance = AggregatesRepositoriesRepository();