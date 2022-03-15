/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:45:01 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 15:59:12
 */

import { Events, Types } from '../../';

export interface EventReducersServiceInterface {
	create: (id: Types.UUID, reducer:Events.Reducers.Reducer) => Promise<Events.Reducers.Reducer>;
	get: (definition: Events.Reducers.Definitions.Definition) => Promise<Events.Reducers.Reducer>;
};

export const EventReducersService = (repository: Events.Reducers.Repository): EventReducersServiceInterface => ({
	create: (id: Types.UUID, reducer:Events.Reducers.Reducer) => repository.create(id, reducer),
	get: (definition: Events.Reducers.Definitions.Definition) => repository.get(definition),
});
