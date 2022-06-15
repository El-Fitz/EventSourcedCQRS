/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:24:56 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:30:52
 */


import { Core } from "event-sourced-cqrs-core"

export interface ProjectionDomain {
	id: Core.Types.UUID;
	tracingId: Core.Types.UUID;
	creationDate: Core.Types.DateTime;
	updatedAt: Core.Types.DateTime | null;
	repositoryId: Core.Types.UUID;
	versionNumber: Core.Types.Version;
	value: Core.Types.Payload;
}