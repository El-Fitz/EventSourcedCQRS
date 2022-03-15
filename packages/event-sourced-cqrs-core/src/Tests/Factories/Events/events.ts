/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 01:47:38 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 01:48:22
 */

import * as Core from "../../../Core/index.js";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";

export default (): Core.Events.Event => ({
	id: uuid(),
	creationDate: DateTime.now(),
	instanceId: uuid(),
	tracingId: uuid(),
	version: "1.0.0",
	name: "name",
	body:  { }
})