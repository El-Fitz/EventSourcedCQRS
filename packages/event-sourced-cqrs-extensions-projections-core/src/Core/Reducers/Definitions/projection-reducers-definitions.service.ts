/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:40:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:32:43
 */

import { Core } from "event-sourced-cqrs-core";
import * as Projections from "../..";

export interface ProjectionReducersDefinitionsServiceInterface {
	create: (projectionBuilderDefinition: Projections.Reducers.Definitions.Definition) => Promise<Projections.Reducers.Definitions.Definition>;
	get: (id: Core.Types.UUID) => Promise<Projections.Reducers.Definitions.Definition[]>;
	query: (event: Core.Events.Event) => Promise<Projections.Reducers.Definitions.Definition[]>;
	delete: (id: Core.Types.UUID) => Promise<void>;
};

export const ProjectionReducersDefinitionsService = (repository: Projections.Reducers.Definitions.Repository): ProjectionReducersDefinitionsServiceInterface => ({
	create: (projectionBuilderDefinition: Projections.Reducers.Definitions.Definition) => repository.create(projectionBuilderDefinition),
	get: (id: Core.Types.UUID) => repository.get(id),
	query: (event: Core.Events.Event) => repository.query(event),
	delete: (id: Core.Types.UUID) => repository.delete(id),
});
