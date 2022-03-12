/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-28 19:03:17 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 16:55:11
 */

import * as Core from "event-sourced-cqrs-core"
import { PlatformInterface } from "event-sourced-cqrs-core"

export * as Aggregates from "./Aggregates";
export * as Commands from "./Commands";
export * as Events from "./Events";
export * as Projections from "./Projections";

import * as Aggregates from "./Aggregates";
import * as Commands from "./Commands";
import * as Events from "./Events";
import * as Projections from "./Projections";

export interface PlatformParams {
	aggregates: {
		reducers: {
			definitions: {
				repository: Core.Aggregates.Reducers.Definitions.Repository
			},
			repository: Core.Aggregates.Reducers.Repository
		}
	},
	commands: {
		reducers: {
			definitions: {
				repository: Core.Commands.Reducers.Definitions.Repository
			}
		}
	},
	events: {
		reducers: {
			definitions: {
				repository: Core.Events.Reducers.Definitions.Repository
			}
		}
	},
	projections: {
		reducers: {
			definitions: {
				repository: Core.Projections.Reducers.Definitions.Repository
			}
		}
	},
}

export const PlatformFactory = (params: PlatformParams): PlatformInterface => {
	const aggregatesRepositoriesRepository = Aggregates.RepositoriesRepositoryInstance
	const aggregatesReducersRepository = params.aggregates.reducers.repository;
	const aggregatesReducersService = Core.Aggregates.Reducers.Service(aggregatesReducersRepository);
	const aggregatesReducersDefinitionsRepository = params.aggregates.reducers.definitions.repository;
	const aggregatesReducersDefinitionsService = Core.Aggregates.Reducers.Definitions.Service(aggregatesReducersDefinitionsRepository);

	const commandsRepository = Commands.Repository()
	const commandsReducersDefinitionsRepository = params.commands.reducers.definitions.repository;

	const eventsRepository = Events.Repository()
	const eventsReducersDefinitionsRepository = params.events.reducers.definitions.repository

	const projectionsRepositoriesRepository = Projections.RepositoriesRepositoryInstance
	const projectionsReducersDefinitionsRepository = params.projections.reducers.definitions.repository

	return {
		Aggregates: {
			RepositoriesRepository: Aggregates.RepositoriesRepositoryInstance,
			ServicesService: Core.Aggregates.ServicesService(aggregatesRepositoriesRepository),
			Reducers: {
				Controller: Core.Aggregates.Reducers.Controller(aggregatesReducersDefinitionsService)(aggregatesReducersService),
				Definitions: {
					Repository: aggregatesReducersDefinitionsRepository,
					Service: aggregatesReducersDefinitionsService,
				},
				Repository: aggregatesReducersRepository,
				Service: aggregatesReducersService,
			}
		},
		Commands: {
			Repository: commandsRepository,
			Service: Core.Commands.Service(commandsRepository),
			MessageBus: Commands.MessageBus(),
			Reducers: {
				Definitions: {
					Repository: commandsReducersDefinitionsRepository,
					Service: Core.Commands.Reducers.Definitions.Service(commandsReducersDefinitionsRepository),
				}
			}
		},
		Events: {
			Repository: eventsRepository,
			Service: Core.Events.Service(eventsRepository),
			MessageBus: Events.MessageBus(),
			Reducers: {
				Definitions: {
					Repository: eventsReducersDefinitionsRepository,
					Service: Core.Events.Reducers.Definitions.Service(eventsReducersDefinitionsRepository),
				}
			}
		},
		Projections: {
			RepositoriesRepository: Projections.RepositoriesRepositoryInstance,
			ServicesService: Core.Projections.ServicesService(projectionsRepositoriesRepository),
			Reducers: {
				Definitions: {
					Repository: projectionsReducersDefinitionsRepository,
					Service: Core.Projections.Reducers.Definitions.Service(projectionsReducersDefinitionsRepository),
				}
			}
		},
	}
}