/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:03:08 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:24:27
 */

import * as Events from "../..";
import * as Types from "../../../Types";

export interface EventReducersDefinitionsRepository {
	create: (eventReducerDefinition: Events.Reducers.Definitions.Definition) => Promise<Events.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Events.Reducers.Definitions.Definition | null>;
	query: (event: Events.Event) => Promise<Events.Reducers.Definitions.Definition[]>;
	delete: (id: Types.UUID) => Promise<void>;
}