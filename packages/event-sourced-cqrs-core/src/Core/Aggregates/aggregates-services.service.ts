/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 20:11:15 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 15:58:04
 */

import { Aggregates, Types } from '../';

export interface AggregatesRepositoriesServiceInterface {
	create: (aggregatesRepository: Aggregates.Repository) => Promise<Aggregates.ServiceInterface>;
	get: (aggregateRepositoryId: Types.UUID) => Promise<Aggregates.ServiceInterface | null>;
	// update: (aggregateBuilder: AggregateBuilderDomain) => Promise<AggregateBuilderDomain>;
	delete: (aggregatesRepositoryId: Types.UUID) => Promise<void>;
}

export const AggregatesRepositoriesService = (repository: Aggregates.RepositoriesRepository): AggregatesRepositoriesServiceInterface => ({
	create: (aggregatesRepository: Aggregates.Repository) => repository.create(aggregatesRepository).then(Aggregates.Service),
	get: (aggregateRepositoryId: Types.UUID)=> repository.get(aggregateRepositoryId).then((repository) => repository === null ? null : Aggregates.Service(repository)),
	// update: (aggregateBuilder: AggregateBuilderDomain) => repository.update(aggregateBuilder),
	delete: (aggregatesRepositoryId: Types.UUID) => repository.delete(aggregatesRepositoryId)
})