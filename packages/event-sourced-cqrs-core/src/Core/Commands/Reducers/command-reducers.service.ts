/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:23:56 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 15:58:37
 */

import { Commands, Types } from '../../';

export interface CommandReducersServiceInterface {
	create: (id: Types.UUID, reducer:Commands.Reducers.Reducer) => Promise<Commands.Reducers.Reducer>;
	get: (definition: Commands.Reducers.Definitions.Definition) => Promise<Commands.Reducers.Reducer>;
};

export const CommandReducersService = (repository: Commands.Reducers.Repository): CommandReducersServiceInterface => ({
	create: (id: Types.UUID, reducer:Commands.Reducers.Reducer) => repository.create(id, reducer),
	get: (definition: Commands.Reducers.Definitions.Definition) => repository.get(definition),
});
