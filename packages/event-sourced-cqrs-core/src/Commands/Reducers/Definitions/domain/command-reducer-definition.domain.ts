
import * as Commands from "../../../";
import * as Types from "../../../../Types";

export interface CommandReducerDefinition {
	id: Types.UUID;
	creationDate: Types.DateTime;
	triggeringCommandId: Types.UUID;
	reducer: () => Promise<Commands.Reducers.Reducer>
}