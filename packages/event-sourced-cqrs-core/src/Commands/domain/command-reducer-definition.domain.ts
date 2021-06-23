
import Commands from "../";
import Types from "../../types";

export interface CommandReducerDefinition {
	id: Types.UUID;
	creationDate: Types.DateTime;
	triggeringCommandId: Types.UUID;
	reducer: () => Promise<Commands.Reducers.Reducer>
}