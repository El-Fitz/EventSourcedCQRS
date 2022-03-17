/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 01:26:07 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-17 13:49:18
 */

import * as Core from "../../../../Core/index.js";
import { v4 as uuid } from "uuid";

export default (params?: { reducerId?: Core.Types.UUID, triggeringCommandId?: Core.Types.UUID }): Core.Commands.Reducers.Definitions.Definition => ({
	id: uuid(),
	reducerId: params?.reducerId ?? uuid(),
	triggeringCommandId: params?.triggeringCommandId ?? uuid()
});