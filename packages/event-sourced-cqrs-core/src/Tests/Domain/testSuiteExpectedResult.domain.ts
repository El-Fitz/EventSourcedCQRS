/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-14 15:13:40 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:07:50
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
	| Core.Aggregates.ServiceInterface
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
	| Core.Projections.ServiceInterface
	| { [key: string]: TestSuiteExpectedResult }
	| Array<TestSuiteExpectedResult>;