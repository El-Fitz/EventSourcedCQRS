/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:24:49 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-11 23:39:26
 */

import * as Aggregates from "../../..";
import * as Types from "../../../../Types";

export interface AggregateReducerDefinition {
	id: Types.UUID;
	triggeringEventId: Types.UUID;
	requiredAggregates: { id: Types.UUID, repositoryId: Types.UUID }[];
	reducer: () => Promise<Aggregates.Reducers.Reducer>
}