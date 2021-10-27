/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:27 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-29 22:54:47
 */

export { Projection } from "./domain";
export { Repository } from "./domain";
export { ProjectionsRepositoriesRepository as RepositoriesRepository } from "./projections-repositories.repository";
export { ProjectionsRepositoriesServiceInterface as ServicesServiceInterface } from "./projections-services.service";
export { ProjectionsRepositoriesService as ServicesService } from "./projections-services.service";
export { ServiceInterface } from "./domain";
export { Service } from "./domain";
export * as Reducers from "./Reducers"
export { ProjectionsReducer as Reducer } from "./projections.reducer"
