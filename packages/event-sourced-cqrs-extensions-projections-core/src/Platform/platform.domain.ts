/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 19:22:06 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:45:22
 */

import * as Projections from '../Core';

export interface PlatformInterface {
	RepositoriesRepository: Projections.RepositoriesRepository,
	ServicesService: Projections.ServicesServiceInterface,
	Reducers: {
		Controller: Projections.Reducers.ControllerInterface,
		Definitions: {
			Repository: Projections.Reducers.Definitions.Repository,
			Service: Projections.Reducers.Definitions.ServiceInterface,
		},
		Repository: Projections.Reducers.Repository,
		Service: Projections.Reducers.ServiceInterface,
	}
}
