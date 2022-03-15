/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 15:54:32 
 * @Last Modified by:   Thomas Léger 
 * @Last Modified time: 2022-03-15 15:54:32 
 */

import * as Types from "../../../../Types";

export interface EventReducerDefinition {
	id: Types.UUID;
	reducerId: Types.UUID;
	triggeringEventId: Types.UUID;
	requiredAggregates: { id: Types.UUID, repositoryId: Types.UUID }[];
}