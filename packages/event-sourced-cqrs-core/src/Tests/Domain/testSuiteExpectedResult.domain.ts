/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-14 15:13:40 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 16:15:00
 */

import * as Core from '../../'

export type TestSuiteExpectedResult =
	string
	| number
	| boolean
	| null
	| Core.Aggregates.Aggregate
	| Core.Aggregates.Reducers.Reducer
	| Core.Aggregates.Reducers.Definitions.Definition
	| Core.Aggregates.Repository
	| Core.Commands.Command
	| Core.Commands.Reducers.Reducer
	| Core.Commands.Reducers.Definitions.Definition
	| Core.Events.Event
	| Core.Events.Reducers.Reducer
	| Core.Events.Reducers.Definitions.Definition
	| Core.Projections.Projection
	| Core.Projections.Reducers.Reducer
	| Core.Projections.Reducers.Definitions.Definition
	| Core.Projections.Repository
	| { [key: string]: TestSuiteExpectedResult }
	| Array<TestSuiteExpectedResult>;