/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-28 18:40:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 17:34:44
 */

import * as Aggregates from "../Aggregates"
import * as Projections from '../Projections';
import * as Commands from "../Commands"
import * as Events from "../Events"

export interface PlatformInterface {
	Aggregates: {
		RepositoriesRepository: Aggregates.RepositoriesRepository,
		ServicesService: Aggregates.ServicesServiceInterface,
		Reducers: {
			Controller: Aggregates.Reducers.ControllerInterface,
			Definitions: {
				Repository: Aggregates.Reducers.Definitions.Repository,
				Service: Aggregates.Reducers.Definitions.ServiceInterface,
			},
			Repository: Aggregates.Reducers.Repository,
			Service: Aggregates.Reducers.ServiceInterface,
		}
	},
	Commands: {
		Repository: Commands.Repository,
		Service: Commands.ServiceInterface,
		MessageBus: Commands.MessageBus,
		Reducers: {
			Controller: Commands.Reducers.ControllerInterface,
			Definitions: {
				Repository: Commands.Reducers.Definitions.Repository,
				Service: Commands.Reducers.Definitions.ServiceInterface,
			},
			Repository: Commands.Reducers.Repository,
			Service: Commands.Reducers.ServiceInterface,
		}
	},
	Events:  {
		Repository: Events.Repository,
		Service: Events.ServiceInterface,
		MessageBus: Events.MessageBus,
		Reducers: {
			Definitions: {
				Repository: Events.Reducers.Definitions.Repository,
				Service: Events.Reducers.Definitions.ServiceInterface,
			}
		}
	},
	Projections: {
		RepositoriesRepository: Projections.RepositoriesRepository,
		ServicesService: Projections.ServicesServiceInterface,
		Reducers: {
			Definitions: {
				Repository: Projections.Reducers.Definitions.Repository,
				Service: Projections.Reducers.Definitions.ServiceInterface,
			}
		}
	},
}
