/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:07:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 02:17:06
 */

import * as AggregateReducersDefinitionsRepository from "./aggregate-reducers-definitions.repository";
import * as AggregateReducersDefinitionsService from "./aggregate-reducers-definitions.service";
import * as AggregatesRepositoriesRepository from "./aggregates-repositories.repository";
import * as AggregatesServicesService from "./aggregates-services.service";

export namespace Aggregates {
	export import RepositoriesRepository = AggregatesRepositoriesRepository.AggregatesRepositoriesRepository;
	export import ServicesService = AggregatesServicesService.AggregatesServicesService;

	export namespace Reducers {

		export namespace Definitions {
			export import Repository = AggregateReducersDefinitionsRepository.AggregateReducersDefinitionsRepository;
			export import Service = AggregateReducersDefinitionsService.AggregateReducersDefinitionsService;
		}
	}
}

export default Aggregates;