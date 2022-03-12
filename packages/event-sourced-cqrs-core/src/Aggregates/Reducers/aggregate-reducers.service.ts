/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:37:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:39:12
 */

import * as Aggregates from "../";

export interface AggregateReducersServiceInterface {
	get: (definition: Aggregates.Reducers.Definitions.Definition) => Promise<Aggregates.Reducers.Reducer>;
};

export const AggregateReducersService = (repository: Aggregates.Reducers.Repository): AggregateReducersServiceInterface => ({
	get: (definition: Aggregates.Reducers.Definitions.Definition) => repository.get(definition),
});
