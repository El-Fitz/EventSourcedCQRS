/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:40:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-11 23:40:10
 */

import * as Aggregates from "../../";
import * as Events from "../../../Events"
import * as Types from "../../../Types";

export interface AggregateReducersDefinitionsServiceInterface {
	get: (id: Types.UUID) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
	query: (event: Events.Event) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
};

export const AggregateReducersDefinitionsService = (repository: Aggregates.Reducers.Definitions.Repository): AggregateReducersDefinitionsServiceInterface => ({
	get: (id: Types.UUID) => repository.get(id),
	query: (event: Events.Event) => repository.query(event),
});
