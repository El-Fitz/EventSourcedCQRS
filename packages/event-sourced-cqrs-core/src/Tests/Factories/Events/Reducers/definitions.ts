/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 01:26:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 15:04:53
 */

import * as Core from "../../../../Core/index.js";
import { v4 as uuid } from "uuid";

export default (params?: { reducerId?: Core.Types.UUID, requiredAggregates?: { id: Core.Types.UUID, repositoryId:  Core.Types.UUID }[]; triggeringEventId?: Core.Types.UUID }): Core.Events.Reducers.Definitions.Definition => ({
	id: uuid(),
	reducerId: params?.reducerId ?? uuid(),
	requiredAggregates: params?.requiredAggregates ?? [],
	triggeringEventId: params?.triggeringEventId ?? uuid()
});