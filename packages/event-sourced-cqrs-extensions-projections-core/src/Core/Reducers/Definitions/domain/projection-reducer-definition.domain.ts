/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:24:49 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:31:59
 */

import { Core } from "event-sourced-cqrs-core";

export interface ProjectionReducerDefinition {
	id: Core.Types.UUID;
	reducerId: Core.Types.UUID;
	triggeringEventId: Core.Types.UUID;
	requiredAggregates: { id: Core.Types.UUID, repositoryId: Core.Types.UUID }[];
}