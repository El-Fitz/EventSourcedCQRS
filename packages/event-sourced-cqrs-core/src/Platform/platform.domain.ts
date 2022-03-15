/*
 * @Author: Thomas Léger 
 * @Date: 2022-03-15 19:22:06 
 * @Last Modified by:   Thomas Léger 
 * @Last Modified time: 2022-03-15 19:22:06 
 */

import * as Aggregates from "../Core/Aggregates"
import * as Projections from '../Core/Projections';
import * as Commands from "../Core/Commands"
import * as Events from "../Core/Events"

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
			Controller: Events.Reducers.ControllerInterface,
			Definitions: {
				Repository: Events.Reducers.Definitions.Repository,
				Service: Events.Reducers.Definitions.ServiceInterface,
			},
			Repository: Events.Reducers.Repository,
			Service: Events.Reducers.ServiceInterface,
		}
	},
	Projections: {
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
	},
}
