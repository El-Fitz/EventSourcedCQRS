/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 01:26:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 01:49:42
 */

import * as Core from "../../../../index.js";
import { v4 as uuid } from "uuid";

export default (reducer: Core.Aggregates.Reducers.Reducer, triggeringEventId: string = uuid()): Core.Aggregates.Reducers.Definitions.Definition => ({
	id: uuid(),
	triggeringEventId,
	requiredAggregates: [],
	reducer: () => Promise.resolve(reducer),
});