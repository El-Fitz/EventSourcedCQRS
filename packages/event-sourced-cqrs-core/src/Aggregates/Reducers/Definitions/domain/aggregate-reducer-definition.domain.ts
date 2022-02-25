/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:24:49 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-29 22:48:00
 */

import * as Aggregates from "../../..";
import * as Types from "../../../../Types";

export interface AggregateReducerDefinition {
	id: Types.UUID;
	creationDate: Types.DateTime;
	triggeringEventId: Types.UUID;
	requiredAggregates: { id: Types.UUID, repositoryId: Types.UUID }[];
	reducer: () => Promise<Aggregates.Reducers.Reducer>
}