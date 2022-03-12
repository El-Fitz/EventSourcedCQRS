/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:40:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-29 22:46:55
 */

import * as Projections from "../..";
import * as Events from "../../../Events"
import * as Types from "../../../Types";

export interface ProjectionReducersDefinitionsServiceInterface {
	create: (projectionBuilderDefinition: Projections.Reducers.Definitions.Definition) => Promise<Projections.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Projections.Reducers.Definitions.Definition[]>;
	query: (event: Events.Event) => Promise<Projections.Reducers.Definitions.Definition[]>;
	delete: (projectionBuilderDefinition: Projections.Reducers.Definitions.Definition) => Promise<void>;
};

export const ProjectionReducersDefinitionsService = (repository: Projections.Reducers.Definitions.Repository): ProjectionReducersDefinitionsServiceInterface => ({
	create: (projectionBuilderDefinition: Projections.Reducers.Definitions.Definition) => repository.create(projectionBuilderDefinition),
	get: (id: Types.UUID) => repository.get(id),
	query: (event: Events.Event) => repository.query(event),
	delete: (projectionBuilderDefinition: Projections.Reducers.Definitions.Definition) => repository.delete(projectionBuilderDefinition),
});
