/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:27 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-29 22:54:47
 */

export { Aggregate } from "./domain";
export { Repository } from "./domain";
export { AggregatesRepositoriesRepository as RepositoriesRepository } from "./aggregates-repositories.repository";
export { AggregatesRepositoriesServiceInterface as ServicesServiceInterface } from "./aggregates-services.service";
export { AggregatesRepositoriesService as ServicesService } from "./aggregates-services.service";
export { ServiceInterface } from "./domain";
export { Service } from "./domain";
export * as Reducers from "./Reducers"
export { AggregatesReducer as Reducer } from "./aggregates.reducer"
