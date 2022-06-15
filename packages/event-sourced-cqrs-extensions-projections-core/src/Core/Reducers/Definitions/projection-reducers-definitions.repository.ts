/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:03:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:32:24
 */

import { Core } from "event-sourced-cqrs-core";
import * as Projections from "../..";

export interface ProjectionReducersDefinitionsRepository {
	create: (projectionReducerDefinition: Projections.Reducers.Definitions.Definition) => Promise<Projections.Reducers.Definitions.Definition>;
	get: (id: Core.Types.UUID) => Promise<Projections.Reducers.Definitions.Definition[]>;
	query: (event: Core.Events.Event) => Promise<Projections.Reducers.Definitions.Definition[]>;
	delete: (id: Core.Types.UUID) => Promise<void>;
}