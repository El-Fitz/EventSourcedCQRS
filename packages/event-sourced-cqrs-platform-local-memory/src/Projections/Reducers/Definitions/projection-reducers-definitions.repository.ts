/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 01:04:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 14:35:07
 */

import * as Core from "event-sourced-cqrs-core";

export const ProjectionReducersDefinitionsRepository = (repository: { [key: string]: Core.Projections.Reducers.Definitions.Definition }): Core.Projections.Reducers.Definitions.Repository => {
	return ({
		create: (projectionReducerDefinition: Core.Projections.Reducers.Definitions.Definition) => {
			repository[projectionReducerDefinition.id] = projectionReducerDefinition;
			return Promise.resolve(projectionReducerDefinition);
		},
		get: (id: Core.Types.UUID) => Promise.resolve(repository[id] === undefined ? [] : [repository[id]]),
		query: (event: Core.Events.Event) => Promise.resolve(Object.values(repository).filter((definition) => definition.triggeringEventId === event.id)),
		delete: (projectionReducerDefinition: Core.Projections.Reducers.Definitions.Definition) => {
			delete repository[projectionReducerDefinition.id]
			return Promise.resolve();
		}
	})
}

export const ProjectionReducersDefinitionsRepositoryInstance = ProjectionReducersDefinitionsRepository({});