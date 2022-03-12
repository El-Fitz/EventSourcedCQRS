/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:35:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:36:55
 */

import * as Aggregates from "../";

export interface AggregateReducersRepository {
	get: (definition: Aggregates.Reducers.Definitions.Definition) => Promise<Aggregates.Reducers.Reducer>;
}