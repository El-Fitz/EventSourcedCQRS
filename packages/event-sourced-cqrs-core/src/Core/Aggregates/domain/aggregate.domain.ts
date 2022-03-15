/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:24:56 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:47:26
 */


import * as Types from "../../Types";

export interface AggregateDomain {
	id: Types.UUID;
	tracingId: Types.UUID;
	creationDate: Types.DateTime;
	updatedAt: Types.DateTime | null;
	repositoryId: Types.UUID;
	versionNumber: Types.Version;
	value: Types.Payload;
}