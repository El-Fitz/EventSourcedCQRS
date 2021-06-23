/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:03:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:48:56
 */

import Aggregates from "./";
import Events from "../Events"
import Types from "../types";

export interface AggregateReducersDefinitionsRepository {
	create: (aggregateReducerDefinition: Aggregates.Reducers.Definitions.Definition) => Promise<Aggregates.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
	query: (event: Events.Event) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
	delete: (aggregateReducerDefinition: Aggregates.Reducers.Definitions.Definition) => Promise<void>;
}