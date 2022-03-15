/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 01:28:57 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 18:54:26
 */

import * as Core from "../../../../Core/index.js";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";

export default (): Core.Aggregates.Reducers.Reducer => (event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve({
	id: uuid(),
	tracingId: event.tracingId,
	creationDate: DateTime.now(),
	updatedAt: null,
	repositoryId: uuid(),
	versionNumber: "1.0.0",
	value: event.body,
});