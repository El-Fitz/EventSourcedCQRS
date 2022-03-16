/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-14 15:11:49 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-16 15:10:29
 */

import * as Core from '../../Core'

export interface TestSuiteParameters {
	aggregates?: {
		items?: Core.Aggregates.Aggregate[];
		reducers?: { id: Core.Types.UUID, reducer: Core.Aggregates.Reducers.Reducer }[];
		reducersDefinitions?: Core.Aggregates.Reducers.Definitions.Definition[];
		repositories?: Core.Aggregates.Repository[];
		services?: Core.Aggregates.ServiceInterface[];
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
		repositories?: Core.Projections.Repository[];
		services?: Core.Projections.ServiceInterface[];
	};
}