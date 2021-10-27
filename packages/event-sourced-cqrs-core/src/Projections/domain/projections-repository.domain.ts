/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:18 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:48:10
 */

import * as Projections from "../";
import * as Types from "../../Types";

export interface ProjectionsRepository {
	id: Types.UUID,
	create: (projections: Projections.Projection) => Promise<Projections.Projection>;
	get: (id: Types.UUID) => Promise<Projections.Projection>;
	delete: (id: Types.UUID) => Promise<void>;
}