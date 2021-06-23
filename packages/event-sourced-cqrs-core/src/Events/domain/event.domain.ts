/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:25 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:47:05
 */

import Types from "../../types";

export interface EventDomain {
	id: Types.UUID;
	creationDate: Types.DateTime;
	instanceId: Types.UUID;
	tracingId: Types.UUID;
	version: Types.Version;
	name: string;
	body: Types.Payload;
}