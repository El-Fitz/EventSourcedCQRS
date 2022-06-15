/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:37:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:34:59
 */

import { Core } from "event-sourced-cqrs-core";
import * as Projections from "..";

export interface ProjectionReducersServiceInterface {
	create: (id: Core.Types.UUID, reducer:Projections.Reducers.Reducer) => Promise<Projections.Reducers.Reducer>;
	get: (definition: Projections.Reducers.Definitions.Definition) => Promise<Projections.Reducers.Reducer>;
};

export const ProjectionReducersService = (repository: Projections.Reducers.Repository): ProjectionReducersServiceInterface => ({
	create: (id: Core.Types.UUID, reducer:Projections.Reducers.Reducer) => repository.create(id, reducer),
	get: (definition: Projections.Reducers.Definitions.Definition) => repository.get(definition),
});
