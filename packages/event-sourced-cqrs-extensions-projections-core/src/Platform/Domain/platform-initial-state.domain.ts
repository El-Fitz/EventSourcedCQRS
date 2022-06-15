/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-14 15:10:57 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 23:11:16
 */

import { Core } from "event-sourced-cqrs-core";
import * as ProjectionsCore from '../../Core'

export interface PlatformInitialState {
	aggregates?: {
		items?: Core.Aggregates.Aggregate[];
		reducers?: { id: Core.Types.UUID, reducer: Core.Aggregates.Reducers.Reducer }[];
		reducersDefinitions?: Core.Aggregates.Reducers.Definitions.Definition[];
		repositories?: Core.Aggregates.Repository[];
	};
	commands?: {
		items?: Core.Commands.Command[],
		reducers?: { id: Core.Types.UUID, reducer: Core.Commands.Reducers.Reducer }[];
		reducersDefinitions?: Core.Commands.Reducers.Definitions.Definition[]
	};
	events?: {
		items?: Core.Events.Event[];
		reducers?: { id: Core.Types.UUID, reducer: Core.Events.Reducers.Reducer }[];
		reducersDefinitions?: Core.Events.Reducers.Definitions.Definition[];
	};
	projections?: {
		items?: ProjectionsCore .Projection[];
		reducers?: { id: Core.Types.UUID, reducer: ProjectionsCore .Reducers.Reducer }[];
		reducersDefinitions?: ProjectionsCore .Reducers.Definitions.Definition[];
		repositories?: ProjectionsCore.Repository[];
	};
}