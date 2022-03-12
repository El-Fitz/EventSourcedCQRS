/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:35:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 18:03:19
 */

import * as Projections from "..";

export interface ProjectionReducersRepository {
	get: (definition: Projections.Reducers.Definitions.Definition) => Promise<Projections.Reducers.Reducer>;
}