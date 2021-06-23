/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:27 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 02:18:54
 */

import Domain from "./domain";
import * as AggregateReducersDefinitionsRepository from "./aggregate-reducers-definitions.repository";
import * as AggregateReducersDefinitionsService from "./aggregate-reducers-definitions.service";
import * as AggregatesRepositoriesRepository from "./aggregates-repositories.repository";
import * as AggregatesServicesService from "./aggregates-services.service";
import * as AggregatesReducer from "./aggregates.reducer";

export namespace Aggregates {
	export import Aggregate = Domain.Aggregate;

	export import Repository = Domain.Repository;
	export import RepositoriesRepository = AggregatesRepositoriesRepository.AggregatesRepositoriesRepository;
	export import ServicesServiceInterface = AggregatesServicesService.AggregatesRepositoriesServiceInterface;
	export import ServicesService = AggregatesServicesService.AggregatesRepositoriesService;
	export import ServiceInterface = Domain.ServiceInterface;
	export import Service = Domain.Service;

	export import Reducer = AggregatesReducer.AggregatesReducer;

	export namespace Reducers {
		export import Reducer = Domain.Reducer;

		export namespace Definitions {
			export import Definition = Domain.ReducerDefinition;
			export import Repository = AggregateReducersDefinitionsRepository.AggregateReducersDefinitionsRepository;
			export import ServiceInterface = AggregateReducersDefinitionsService.AggregateReducersDefinitionsServiceInterface;
			export import Service = AggregateReducersDefinitionsService.AggregateReducersDefinitionsService;
		}
	}
}

export default Aggregates;