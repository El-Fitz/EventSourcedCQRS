/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:01:47 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:24:35
 */


import * as Events from "../../"
import * as Types from "../../../Types";

export interface EventReducersDefinitionsServiceInterface {
	create: (eventReducerDefinition: Events.Reducers.Definitions.Definition) => Promise<Events.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Events.Reducers.Definitions.Definition | null>;
	query: (event: Events.Event) => Promise<Events.Reducers.Definitions.Definition[]>;
	delete: (id: Types.UUID) => Promise<void>;
};

export const EventReducersDefinitionsService = (repository: Events.Reducers.Definitions.Repository): Events.Reducers.Definitions.ServiceInterface => ({
	create: (eventReducerDefinition: Events.Reducers.Definitions.Definition) => repository.create(eventReducerDefinition),
	get: (id: Types.UUID) => repository.get(id),
	query: (event: Events.Event) => repository.query(event),
	delete: (id: Types.UUID) => repository.delete(id),
});
