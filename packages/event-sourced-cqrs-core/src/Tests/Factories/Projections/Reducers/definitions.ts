/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 01:26:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 18:54:45
 */

import * as Core from "../../../../Core/index.js";
import { v4 as uuid } from "uuid";

export default (params?: { reducerId?: Core.Types.UUID, triggeringEventId?: Core.Types.UUID }): Core.Projections.Reducers.Definitions.Definition => ({
	id: uuid(),
	reducerId: params?.reducerId ?? uuid(),
	triggeringEventId: params?.triggeringEventId ?? uuid(),
	requiredAggregates: []
});