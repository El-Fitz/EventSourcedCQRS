/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 01:26:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 16:38:09
 */

import * as Core from "../../../../index.js";
import { v4 as uuid } from "uuid";

export default (triggeringEventId: string = uuid()): Core.Aggregates.Reducers.Definitions.Definition => ({
	id: uuid(),
	triggeringEventId,
	requiredAggregates: []
});