/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-12 23:57:59 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-13 00:05:06
 */

import * as ObservabilityRepository from "./observability.repository";
import * as ObservabilityService from "./observability.service";

namespace Observability {
	export import Repository = ObservabilityRepository.ObservabilityRepository;
	export import ServiceInterface = ObservabilityService.ObservabilityServiceInterface;
	export import Service = ObservabilityService.ObservabilityService;
}

export default Observability;