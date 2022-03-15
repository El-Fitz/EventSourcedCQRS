/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-14 15:10:57 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:04:29
 */

import * as Core from '../../Core'

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
		items?: Core.Projections.Projection[];
		reducers?: { id: Core.Types.UUID, reducer: Core.Projections.Reducers.Reducer }[];
		reducersDefinitions?: Core.Projections.Reducers.Definitions.Definition[];
		repositories?: Core.Projections.RepositoriesRepository[];
	};
}