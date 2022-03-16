/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:56 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 12:54:55
 */

import * as Types from "../../Types";

export interface CommandDomain {
	id: Types.UUID;
	creationDate: Types.DateTime;
	instanceId: Types.UUID;
	tracingId: Types.UUID;
	version: Types.Version;
	name: string;
	body: Types.Payload;
}