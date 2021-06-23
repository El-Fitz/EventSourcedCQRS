/*
* @Author: Thomas Léger 
* @Date: 2021-06-11 16:25:02 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-12 22:29:35
*/

import * as AggregateDomain from "./aggregate.domain";
import * as AggregateReducer from "./aggregate-reducer.domain";
import * as AggregatesReducerDefintion from "./aggregate-reducer-definition.domain";
import * as AggregatesRepository from "./aggregates-repository.domain";
import * as AggregatesService from "./aggregates-service.domain";

namespace Domain {
	export import Aggregate = AggregateDomain.AggregateDomain;
	export import Repository = AggregatesRepository.AggregatesRepository;
	export import ServiceInterface = AggregatesService.AggregatesServiceInterface;
	export import Service = AggregatesService.AggregatesService;
	export import Reducer = AggregateReducer.AggregateReducer;
	export import ReducerDefinition = AggregatesReducerDefintion.AggregateReducerDefinition;
}

export default Domain;