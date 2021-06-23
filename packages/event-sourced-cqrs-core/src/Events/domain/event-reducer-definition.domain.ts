
import Events from "../";
import Types from "../../types";

export interface EventReducerDefinition {
	id: Types.UUID;
	creationDate: Types.DateTime;
	triggeringEventId: Types.UUID;
	requiredAggregates: { id: Types.UUID, repositoryId: Types.UUID }[];
	reducer: () => Promise<Events.Reducers.Reducer>
}