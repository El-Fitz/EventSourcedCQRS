/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:23:54 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 15:57:50
 */

import { Commands, Types } from '../../';

export interface CommandReducersRepository {
	create: (id: Types.UUID, reducer:Commands.Reducers.Reducer) => Promise<Commands.Reducers.Reducer>;
	get: (definition: Commands.Reducers.Definitions.Definition) => Promise<Commands.Reducers.Reducer>;
}