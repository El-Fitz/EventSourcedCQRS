/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:45:01 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:48:23
 */

import * as Events from "../";

export interface EventReducersServiceInterface {
	get: (definition: Events.Reducers.Definitions.Definition) => Promise<Events.Reducers.Reducer>;
};

export const EventReducersService = (repository: Events.Reducers.Repository): EventReducersServiceInterface => ({
	get: (definition: Events.Reducers.Definitions.Definition) => repository.get(definition),
});
