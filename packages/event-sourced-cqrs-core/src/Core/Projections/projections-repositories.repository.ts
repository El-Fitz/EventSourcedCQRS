/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 20:15:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 00:36:52
 */

import * as Projections from ".";
import * as Types from "../Types";

export interface ProjectionsRepositoriesRepository {
	create: (aggregate: Projections.Repository) => Promise<Projections.Repository>;
	get: (projectionsRepositoryId: Types.UUID) => Promise<Projections.Repository | null>;
	delete: (id: Types.UUID) => Promise<void>;
}