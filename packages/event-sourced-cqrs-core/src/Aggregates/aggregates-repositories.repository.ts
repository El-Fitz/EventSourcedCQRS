/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 20:15:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-23 23:10:47
 */

import Aggregates from "./";
import Types from "../types";

export interface AggregatesRepositoriesRepository {
	create: (aggregate: Aggregates.Repository) => Promise<Aggregates.Repository>;
	get: (aggregatesRepositoryId: Types.UUID) => Promise<Aggregates.Repository | null>;
	delete: (id: Types.UUID) => Promise<void>;
}