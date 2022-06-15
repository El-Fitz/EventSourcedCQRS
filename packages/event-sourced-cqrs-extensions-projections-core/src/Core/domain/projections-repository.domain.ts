/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:18 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:31:14
 */

import { Core } from "event-sourced-cqrs-core"
import * as Projections from "../";

export interface ProjectionsRepository {
	id: Core.Types.UUID,
	create: (projections: Projections.Projection) => Promise<Projections.Projection>;
	get: (id: Core.Types.UUID) => Promise<Projections.Projection>;
	delete: (id: Core.Types.UUID) => Promise<void>;
}