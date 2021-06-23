/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-12 22:25:49 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-12 22:29:46
 */

import * as CommandDomain from "./command.domain";
import * as CommandReducer from "./command-reducer.domain";
import * as CommandReducerDefinition from "./command-reducer-definition.domain";

namespace Domain {
	export import Command = CommandDomain.CommandDomain;
	export import Reducer = CommandReducer.CommandReducer;
	export import ReducerDefinition = CommandReducerDefinition.CommandReducerDefinition;
}

export default Domain;