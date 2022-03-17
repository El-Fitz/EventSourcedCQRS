/*
* @Author: Thomas Léger 
* @Date: 2022-03-12 01:28:57 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 13:51:19
*/

import * as Core from "../../../../Core/index.js";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";

export default (): Core.Commands.Reducers.Reducer => (command: Core.Commands.Command) => Promise.resolve([{
	id: uuid(),
	creationDate: DateTime.now(),
	instanceId: uuid(),
	tracingId: command.tracingId,
	version: "1.0.0",
	name: "name",
	body:  { }
}]);