/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:40:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 00:00:54
 */

import * as Projections from "../..";
import * as Events from "../../../Events"
import * as Types from "../../../Types";

export interface ProjectionReducersDefinitionsServiceInterface {
	get: (id: Types.UUID) => Promise<Projections.Reducers.Definitions.Definition[]>;
	query: (event: Events.Event) => Promise<Projections.Reducers.Definitions.Definition[]>;
};

export const ProjectionReducersDefinitionsService = (repository: Projections.Reducers.Definitions.Repository): ProjectionReducersDefinitionsServiceInterface => ({
	get: (id: Types.UUID) => repository.get(id),
	query: (event: Events.Event) => repository.query(event),
});
