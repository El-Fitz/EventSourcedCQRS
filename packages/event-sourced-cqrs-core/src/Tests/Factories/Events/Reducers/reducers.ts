/*
* @Author: Thomas Léger 
* @Date: 2022-03-12 01:28:57 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 15:05:50
*/

import { Core } from "../../../../";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";

export default (): Core.Events.Reducers.Reducer => (event: Core.Events.Event) => (_aggregates: Core.Aggregates.Aggregate[]) => Promise.resolve([{
	id: uuid(),
	creationDate: DateTime.now(),
	instanceId: uuid(),
	tracingId: event.tracingId,
	version: "1.0.0",
	name: "name",
	body:  { }
}]);