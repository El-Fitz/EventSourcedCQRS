/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-23 23:25:58 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:07:37
 */

import { Core } from "event-sourced-cqrs-core";
import { v4 as uuid } from "uuid";
import * as ProjectionsCore from "../../../Core";

export const projectionRepositoryFactory = (): ProjectionsCore.Repository => {
	let projectionsHashmap: { [key: string]: ProjectionsCore.Projection } = {};
	return {
		id: uuid(),
		create: (projection: ProjectionsCore.Projection) => {
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