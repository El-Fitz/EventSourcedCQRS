/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:24:49 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-29 22:48:00
 */

import * as Projections from "../../..";
import * as Types from "../../../../Types";

export interface ProjectionReducerDefinition {
	id: Types.UUID;
	creationDate: Types.DateTime;
	triggeringEventId: Types.UUID;
	requiredAggregates: { id: Types.UUID, repositoryId: Types.UUID }[];
	reducer: () => Promise<Projections.Reducers.Reducer>
}