/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:23 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:50:41
 */

import * as Aggregates from "../";
import * as Types from "../../Types";

export interface AggregatesServiceInterface {
	repositoryId: Types.UUID;
	create: (aggregate: Aggregates.Aggregate) => Promise<Aggregates.Aggregate>;
	get: (id: Types.UUID) => Promise<Aggregates.Aggregate>;
	delete: (id: Types.UUID) => Promise<void>;
}

export const AggregatesService = (repository: Aggregates.Repository): AggregatesServiceInterface => ({
	repositoryId: repository.id,
	create: (aggregate: Aggregates.Aggregate) => repository.create(aggregate),
	get: (id: Types.UUID) => repository.get(id),
	delete: (id: Types.UUID) => repository.delete(id),
})