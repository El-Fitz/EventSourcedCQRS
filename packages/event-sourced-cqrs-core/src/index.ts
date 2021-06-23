/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-12 23:50:36 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-18 16:37:33
 */

import AggregatesImport from "./Aggregates";
import CommandsImport from "./Commands";
import EventsImport from "./Events";
import ObservabilityImports from "./Observability";
import TypesImport from "./Types";

namespace Core {
	export import Aggregates = AggregatesImport;
	export import Commands = CommandsImport;
	export import Events = EventsImport;
	export import Observability = ObservabilityImports;
	export import Types = TypesImport;
}

export default Core;
