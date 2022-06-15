/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:35:04 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:33:51
 */

import { Core } from "event-sourced-cqrs-core";
import * as Projections from "..";

export interface ProjectionReducersRepository {
	create: (id: Core.Types.UUID, reducer:Projections.Reducers.Reducer) => Promise<Projections.Reducers.Reducer>;
	get: (definition: Projections.Reducers.Definitions.Definition) => Promise<Projections.Reducers.Reducer>;
}