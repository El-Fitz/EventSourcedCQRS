/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-14 15:13:40 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:38:37
 */

import * as Core from '../../Core'

export type TestSuiteExpectedResult =
	string
	| number
	| boolean
	| null
	| Core.Projection
	| Core.Reducers.Reducer
	| Core.Reducers.Definitions.Definition
	| Core.Repository
	| Core.ServiceInterface
	| { [key: string]: TestSuiteExpectedResult }
	| Array<TestSuiteExpectedResult>;