/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 17:45:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:48:15
 */

import * as Events from "../";

export interface EventReducersRepository {
	get: (definition: Events.Reducers.Definitions.Definition) => Promise<Events.Reducers.Reducer>;
}