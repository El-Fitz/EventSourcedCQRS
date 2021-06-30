/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:18 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:48:10
 */

import * as Aggregates from "../";
import * as Types from "../../types";

export interface AggregatesRepository {
	id: Types.UUID,
	create: (aggregate: Aggregates.Aggregate) => Promise<Aggregates.Aggregate>;
	get: (id: Types.UUID) => Promise<Aggregates.Aggregate>;
	delete: (id: Types.UUID) => Promise<void>;
}