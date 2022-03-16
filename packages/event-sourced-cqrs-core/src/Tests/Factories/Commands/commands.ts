/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-16 12:53:03 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 13:02:09
 */

import { Core } from "../../../index.js";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";

export default (parameters?: { tracingId?: Core.Types.UUID, name?: string, version?: Core.Types.Version }): Core.Commands.Command => ({
	id: uuid(),
	creationDate: DateTime.now(),
	instanceId: uuid(),
	tracingId: parameters?.tracingId ?? uuid(),
	version: parameters?.version ?? '1.0.0',
	name: parameters?.name ?? uuid(),
	body: null,
});