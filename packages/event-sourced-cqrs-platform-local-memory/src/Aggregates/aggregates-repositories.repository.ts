/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:03:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:40:40
 */

import Core from "event-sourced-cqrs-core";

export const AggregatesRepositoriesRepository = (): Core.Aggregates.RepositoriesRepository => {

	let repository: { [key: string]: Core.Aggregates.Repository } =  { };

	return ({
		create: (aggregatesRepository: Core.Aggregates.Repository) => {
			repository[aggregatesRepository.id] = aggregatesRepository;
			return Promise.resolve(aggregatesRepository);
		},
		get: (id: Core.Types.UUID) => {
			const result = repository[id];
			return Promise.resolve(result ?? null)
		},
		delete: (aggregateRepositoryId: Core.Types.UUID) => {
			delete repository[aggregateRepositoryId]
			return Promise.resolve();
		}
	})
}

export const AggregatesRepositoriesRepositoryInstance = AggregatesRepositoriesRepository();