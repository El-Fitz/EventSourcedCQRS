/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:45:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 15:59:00
 */

import { Events, Types } from '../../';

export interface EventReducersRepository {
	create: (id: Types.UUID, reducer:Events.Reducers.Reducer) => Promise<Events.Reducers.Reducer>;
	get: (definition: Events.Reducers.Definitions.Definition) => Promise<Events.Reducers.Reducer>;
}