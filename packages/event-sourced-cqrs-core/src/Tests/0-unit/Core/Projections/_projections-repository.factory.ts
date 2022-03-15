/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-23 23:25:58 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:35:46
 */

import { v4 as uuid } from "uuid";
import * as Core from "../../../../Core";

export const projectionRepositoryFactory = (): Core.Projections.Repository => {
	let projectionsHashmap: { [key: string]: Core.Projections.Projection } = {};
	return {
		id: uuid(),
		create: (projection: Core.Projections.Projection) => {
			projectionsHashmap[projection.id] = projection;
			return Promise.resolve(projection)
		},
		get: (id: Core.Types.UUID) => {
			const projection = projectionsHashmap[id];
			return Promise.resolve(projection ?? null);
		},
		delete: (id: Core.Types.UUID) => {
			delete projectionsHashmap[id];
			return Promise.resolve();
		}
	}
}