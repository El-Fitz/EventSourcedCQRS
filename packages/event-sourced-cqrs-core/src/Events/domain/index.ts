/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-12 22:35:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-12 23:09:01
 */

import * as EventDomain from "./event.domain";
import * as EventReducer from "./event-reducer.domain";
import * as EventReducerDefinition from "./event-reducer-definition.domain";

namespace Domain {
	export import Event = EventDomain.EventDomain;
	export import Reducer = EventReducer.EventReducer;
	export import ReducerDefinition = EventReducerDefinition.EventReducerDefinition;
}

export default Domain;