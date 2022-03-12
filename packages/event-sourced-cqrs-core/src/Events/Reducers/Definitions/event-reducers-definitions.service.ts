/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 18:01:47 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-11 23:41:50
 */


import * as Events from "../../"
import * as Types from "../../../Types";

export interface EventReducersDefinitionsServiceInterface {
	get: (id: Types.UUID) => Promise<Events.Reducers.Definitions.Definition | null>;
	query: (event: Events.Event) => Promise<Events.Reducers.Definitions.Definition[]>;
};

export const EventReducersDefinitionsService = (repository: Events.Reducers.Definitions.Repository): Events.Reducers.Definitions.ServiceInterface => ({
	get: (id: Types.UUID) => repository.get(id),
	query: (event: Events.Event) => repository.query(event),
});
