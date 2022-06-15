/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 20:15:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:35:10
 */

import { Core } from "event-sourced-cqrs-core";
import * as Projections from ".";

export interface ProjectionsRepositoriesRepository {
	create: (aggregate: Projections.Repository) => Promise<Projections.Repository>;
	get: (projectionsRepositoryId: Core.Types.UUID) => Promise<Projections.Repository | null>;
	delete: (id: Core.Types.UUID) => Promise<void>;
}