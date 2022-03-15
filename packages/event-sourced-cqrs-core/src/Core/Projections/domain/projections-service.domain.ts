/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:23 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:50:41
 */

import * as Projections from "../";
import * as Types from "../../Types";

export interface ProjectionsServiceInterface {
	repositoryId: Types.UUID;
	create: (projection: Projections.Projection) => Promise<Projections.Projection>;
	get: (id: Types.UUID) => Promise<Projections.Projection>;
	delete: (id: Types.UUID) => Promise<void>;
}

export const ProjectionsService = (repository: Projections.Repository): ProjectionsServiceInterface => ({
	repositoryId: repository.id,
	create: (projection: Projections.Projection) => repository.create(projection),
	get: (id: Types.UUID) => repository.get(id),
	delete: (id: Types.UUID) => repository.delete(id),
})