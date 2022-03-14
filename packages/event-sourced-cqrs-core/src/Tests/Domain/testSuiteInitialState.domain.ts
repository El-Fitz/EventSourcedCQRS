/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-14 15:10:57 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:11:42
 */

import * as Core from '../../'

export interface TestSuiteInitialState {
	aggregates?: {
		items?: Core.Aggregates.Aggregate[];
		reducers?: Core.Aggregates.Reducers.Reducer[];
		reducersDefinitions?: Core.Aggregates.Reducers.Definitions.Definition[];
		repositories?: Core.Aggregates.Repository[];
		services?: Core.Aggregates.ServiceInterface[];
	};
	commands?: {
		items?: Core.Commands.Command[],
		reducers?: Core.Commands.Reducers.Reducer[],
		reducersDefinitions?: Core.Commands.Reducers.Definitions.Definition[]
	};
	events?: {
		items?: Core.Events.Event[];
		reducers?: Core.Events.Reducers.Reducer[];
		reducersDefinitions?: Core.Events.Reducers.Definitions.Definition[];
	};
	projections?: {
		items?: Core.Projections.Projection[];
		reducers?: Core.Projections.Reducers.Reducer[];
		reducersDefinitions?: Core.Projections.Reducers.Definitions.Definition[];
		repositories?: Core.Projections.RepositoriesRepository[];
		services?: Core.Projections.ServiceInterface[];
	};
}