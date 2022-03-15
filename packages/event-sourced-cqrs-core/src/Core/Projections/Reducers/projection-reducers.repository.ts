/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:35:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 15:59:21
 */

import { Projections, Types } from '../../';

export interface ProjectionReducersRepository {
	create: (id: Types.UUID, reducer:Projections.Reducers.Reducer) => Promise<Projections.Reducers.Reducer>;
	get: (definition: Projections.Reducers.Definitions.Definition) => Promise<Projections.Reducers.Reducer>;
}