/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:03:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-29 22:47:00
 */

import * as Aggregates from "../..";
import * as Events from "../../../Events"
import * as Types from "../../../types";

export interface AggregateReducersDefinitionsRepository {
	create: (aggregateReducerDefinition: Aggregates.Reducers.Definitions.Definition) => Promise<Aggregates.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
	query: (event: Events.Event) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
	delete: (aggregateReducerDefinition: Aggregates.Reducers.Definitions.Definition) => Promise<void>;
}