/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 01:26:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:39:58
 */

import { Core } from "event-sourced-cqrs-core";
import * as ProjectionsCore from "../../../Core/index.js";
import { v4 as uuid } from "uuid";

export default (params?: { reducerId?: Core.Types.UUID, triggeringEventId?: Core.Types.UUID }): ProjectionsCore.Reducers.Definitions.Definition => ({
	id: uuid(),
	reducerId: params?.reducerId ?? uuid(),
	triggeringEventId: params?.triggeringEventId ?? uuid(),
	requiredAggregates: []
});