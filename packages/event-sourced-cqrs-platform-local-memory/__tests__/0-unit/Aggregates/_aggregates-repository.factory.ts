/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-23 23:25:58 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:26:23
 */

import { v4 as uuid } from "uuid";
import Core from "event-sourced-cqrs-core";

export const aggregateRepositoryFactory = (): Core.Aggregates.Repository => {
	let aggregatesHashmap: { [key: string]: Core.Aggregates.Aggregate } = {};
	return {
		id: uuid(),
		create: (aggregate: Core.Aggregates.Aggregate) => {
			aggregatesHashmap[aggregate.id] = aggregate;
			return Promise.resolve(aggregate)
		},
		get: (id: Core.Types.UUID) => {
			const aggregate = aggregatesHashmap[id];
			return Promise.resolve(aggregate ?? null);
		},
		delete: (id: Core.Types.UUID) => {
			delete aggregatesHashmap[id];
			return Promise.resolve();
		}
	}
}