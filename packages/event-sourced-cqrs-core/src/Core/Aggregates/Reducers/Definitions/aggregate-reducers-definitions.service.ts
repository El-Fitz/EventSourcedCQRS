/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:40:11 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:23:33
 */

import * as Aggregates from "../..";
import * as Events from "../../../Events"
import * as Types from "../../../Types";

export interface AggregateReducersDefinitionsServiceInterface {
	create: (aggregateBuilderDefinition: Aggregates.Reducers.Definitions.Definition) => Promise<Aggregates.Reducers.Definitions.Definition>;
	get: (id: Types.UUID) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
	query: (event: Events.Event) => Promise<Aggregates.Reducers.Definitions.Definition[]>;
	delete: (id: Types.UUID) => Promise<void>;
};

export const AggregateReducersDefinitionsService = (repository: Aggregates.Reducers.Definitions.Repository): AggregateReducersDefinitionsServiceInterface => ({
	create: (aggregateBuilderDefinition: Aggregates.Reducers.Definitions.Definition) => repository.create(aggregateBuilderDefinition),
	get: (id: Types.UUID) => repository.get(id),
	query: (event: Events.Event) => repository.query(event),
	delete: (id: Types.UUID)  => repository.delete(id),
});
