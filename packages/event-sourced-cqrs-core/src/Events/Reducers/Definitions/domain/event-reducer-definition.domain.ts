
import * as Events from "../../../";
import * as Types from "../../../../Types";

export interface EventReducerDefinition {
	id: Types.UUID;
	triggeringEventId: Types.UUID;
	requiredAggregates: { id: Types.UUID, repositoryId: Types.UUID }[];
	reducer: () => Promise<Events.Reducers.Reducer>
}