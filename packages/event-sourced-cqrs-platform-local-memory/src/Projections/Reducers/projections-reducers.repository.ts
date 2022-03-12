/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-12 15:42:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 18:07:23
 */

import * as Core from "event-sourced-cqrs-core";

export const ProjectionsReducersRepository = (repository: { [key: string]: Core.Projections.Reducers.Reducer }): Core.Projections.Reducers.Repository => {
	return ({
		get: (definition: Core.Projections.Reducers.Definitions.Definition) => repository[definition.id] === undefined ? Promise.reject() : Promise.resolve(repository[definition.id]),
	})
}

export const ProjectionsReducersRepositoryInstance = ProjectionsReducersRepository({});