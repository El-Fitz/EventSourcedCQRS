/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:03:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-29 22:47:00
 */

import * as Projections from "../..";
import * as Events from "../../../Events"
import * as Types from "../../../Types";

export interface ProjectionReducersDefinitionsRepository {
	create: (projectionReducerDefinition: Projections.Reducers.Definitions.Definition) => Promise<Projections.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Projections.Reducers.Definitions.Definition[]>;
	query: (event: Events.Event) => Promise<Projections.Reducers.Definitions.Definition[]>;
	delete: (projectionReducerDefinition: Projections.Reducers.Definitions.Definition) => Promise<void>;
}