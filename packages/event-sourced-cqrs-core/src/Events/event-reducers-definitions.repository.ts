/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:03:08 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 18:58:15
 */

import Events from "./";
import Types from "../types";

export interface EventReducersDefinitionsRepository {
	create: (eventReducerDefinition: Events.Reducers.Definitions.Definition) => Promise<Events.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Events.Reducers.Definitions.Definition | null>;
	query: (event: Events.Event) => Promise<Events.Reducers.Definitions.Definition[]>;
	delete: (eventReducerDefinition: Events.Reducers.Definitions.Definition) => Promise<void>;
}