/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:03:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-11 23:39:36
 */

import * as Aggregates from "../..";
import * as Events from "../../../Events"
import * as Types from "../../../Types";

export interface AggregateReducersDefinitionsRepository {
	get: (id: Types.UUID) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
	query: (event: Events.Event) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
}