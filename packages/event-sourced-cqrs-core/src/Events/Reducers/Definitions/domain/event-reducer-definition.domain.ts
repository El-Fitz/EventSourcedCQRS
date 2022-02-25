
import * as Events from "../../../";
import * as Types from "../../../../Types";

export interface EventReducerDefinition {
	id: Types.UUID;
	creationDate: Types.DateTime;
	triggeringEventId: Types.UUID;
	requiredAggregates: { id: Types.UUID, repositoryId: Types.UUID }[];
	reducer: () => Promise<Events.Reducers.Reducer>
}