/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:03:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:23:49
 */

import * as Aggregates from "../..";
import * as Events from "../../../Events"
import * as Types from "../../../Types";

export interface AggregateReducersDefinitionsRepository {
	create: (aggregateReducerDefinition: Aggregates.Reducers.Definitions.Definition) => Promise<Aggregates.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
	query: (event: Events.Event) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
	delete: (id: Types.UUID) => Promise<void>;
}