/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:37:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 15:58:32
 */

import { Aggregates, Types } from '../../';

export interface AggregateReducersServiceInterface {
	create: (id: Types.UUID, reducer:Aggregates.Reducers.Reducer) => Promise<Aggregates.Reducers.Reducer>;
	get: (definition: Aggregates.Reducers.Definitions.Definition) => Promise<Aggregates.Reducers.Reducer>;
};

export const AggregateReducersService = (repository: Aggregates.Reducers.Repository): AggregateReducersServiceInterface => ({
	create: (id: Types.UUID, reducer:Aggregates.Reducers.Reducer) => repository.create(id, reducer),
	get: (definition: Aggregates.Reducers.Definitions.Definition) => repository.get(definition),
});
