/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:37:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 18:03:03
 */

import * as Projections from "..";

export interface ProjectionReducersServiceInterface {
	get: (definition: Projections.Reducers.Definitions.Definition) => Promise<Projections.Reducers.Reducer>;
};

export const ProjectionReducersService = (repository: Projections.Reducers.Repository): ProjectionReducersServiceInterface => ({
	get: (definition: Projections.Reducers.Definitions.Definition) => repository.get(definition),
});
