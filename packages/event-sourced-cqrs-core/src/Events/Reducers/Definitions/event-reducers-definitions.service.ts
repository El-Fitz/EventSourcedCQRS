/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:01:47 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 00:51:13
 */


import * as Events from "../../"
import * as Types from "../../../Types";

export interface EventReducersDefinitionsServiceInterface {
	create: (eventReducerDefinition: Events.Reducers.Definitions.Definition) => Promise<Events.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Events.Reducers.Definitions.Definition | null>;
	query: (event: Events.Event) => Promise<Events.Reducers.Definitions.Definition[]>;
	delete: (eventReducerDefinition: Events.Reducers.Definitions.Definition) => Promise<void>;
};

export const EventReducersDefinitionsService = (repository: Events.Reducers.Definitions.Repository): Events.Reducers.Definitions.ServiceInterface => ({
	create: (eventReducerDefinition: Events.Reducers.Definitions.Definition) => repository.create(eventReducerDefinition),
	get: (id: Types.UUID) => repository.get(id),
	query: (event: Events.Event) => repository.query(event),
	delete: (eventReducerDefinition: Events.Reducers.Definitions.Definition) => repository.delete(eventReducerDefinition),
});
