/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 01:26:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:37:01
 */

import * as Core from "../../../../index.js";
import { v4 as uuid } from "uuid";

export default (triggeringEventId: string = uuid()): Core.Projections.Reducers.Definitions.Definition => ({
	id: uuid(),
	triggeringEventId,
	requiredAggregates: []
});