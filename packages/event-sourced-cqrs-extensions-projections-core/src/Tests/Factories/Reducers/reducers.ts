/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 01:28:57 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 23:07:09
 */

import { Core } from "event-sourced-cqrs-core";

import { Core as ProjectionsCore } from "../../../";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";

export default (): ProjectionsCore.Reducers.Reducer => (event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve({
	id: uuid(),
	tracingId: event.tracingId,
	creationDate: DateTime.now(),
	updatedAt: null,
	repositoryId: uuid(),
	versionNumber: "1.0.0",
	value: event.body,
} as ProjectionsCore.Projection);