/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:35:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 14:32:51
 */

import { Aggregates, Types } from '../../';

export interface AggregateReducersRepository {
	create: (id: Types.UUID, reducer: Aggregates.Reducers.Reducer) => Promise<Aggregates.Reducers.Reducer>;
	get: (definition: Aggregates.Reducers.Definitions.Definition) => Promise<Aggregates.Reducers.Reducer>;
}