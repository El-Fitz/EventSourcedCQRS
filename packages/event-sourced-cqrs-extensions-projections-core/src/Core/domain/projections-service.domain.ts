/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:23 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:31:35
 */

import { Core } from "event-sourced-cqrs-core";
import * as Projections from "../";

export interface ProjectionsServiceInterface {
	repositoryId: Core.Types.UUID;
	create: (projection: Projections.Projection) => Promise<Projections.Projection>;
	get: (id: Core.Types.UUID) => Promise<Projections.Projection>;
	delete: (id: Core.Types.UUID) => Promise<void>;
}

export const ProjectionsService = (repository: Projections.Repository): ProjectionsServiceInterface => ({
	repositoryId: repository.id,
	create: (projection: Projections.Projection) => repository.create(projection),
	get: (id: Core.Types.UUID) => repository.get(id),
	delete: (id: Core.Types.UUID) => repository.delete(id),
})