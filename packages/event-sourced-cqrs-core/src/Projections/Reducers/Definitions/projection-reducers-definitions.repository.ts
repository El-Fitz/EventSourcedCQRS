/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:03:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-11 23:42:20
 */

import * as Projections from "../..";
import * as Events from "../../../Events"
import * as Types from "../../../Types";

export interface ProjectionReducersDefinitionsRepository {
	get: (id: Types.UUID) => Promise<Projections.Reducers.Definitions.Definition[]>;
	query: (event: Events.Event) => Promise<Projections.Reducers.Definitions.Definition[]>;
}