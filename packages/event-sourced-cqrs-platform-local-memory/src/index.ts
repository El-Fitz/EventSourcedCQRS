/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-28 19:03:17 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 18:10:29
 */

import { Core } from "event-sourced-cqrs-core"
import { Platform } from  "event-sourced-cqrs-core"

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
			},
			repository: Core.Commands.Reducers.Repository
		}
	},
	events: {
		reducers: {
			definitions: {
				repository: Core.Events.Reducers.Definitions.Repository
			},
			repository: Core.Events.Reducers.Repository
		}
	},
	projections: {
		reducers: {
			definitions: {
				repository: Core.Projections.Reducers.Definitions.Repository
			},
			repository: Core.Projections.Reducers.Repository
		}
	},
}

export const PlatformFactory = (params: PlatformParams): Platform.PlatformInterface => {
	const aggregatesRepositoriesRepository = Aggregates.RepositoriesRepositoryInstance
	const aggregatesReducersRepository = params.aggregates.reducers.repository;
	const aggregatesReducersService = Core.Aggregates.Reducers.Service(aggregatesReducersRepository);
	const aggregatesReducersDefinitionsRepository = params.aggregates.reducers.definitions.repository;
	const aggregatesReducersDefinitionsService = Core.Aggregates.Reducers.Definitions.Service(aggregatesReducersDefinitionsRepository);

	const commandsRepository = Commands.Repository()
	const commandsReducersRepository = params.commands.reducers.repository;
	const commandsReducersService = Core.Commands.Reducers.Service(commandsReducersRepository);
	const commandsReducersDefinitionsRepository = params.commands.reducers.definitions.repository;
	const commandsReducersDefinitionsService = Core.Commands.Reducers.Definitions.Service(commandsReducersDefinitionsRepository);

	const eventsRepository = Events.Repository()
	const eventsReducersRepository = params.events.reducers.repository;
	const eventsReducersService = Core.Events.Reducers.Service(eventsReducersRepository);
	const eventsReducersDefinitionsRepository = params.events.reducers.definitions.repository;
	const eventsReducersDefinitionsService = Core.Events.Reducers.Definitions.Service(eventsReducersDefinitionsRepository);

	const projectionsRepositoriesRepository = Projections.RepositoriesRepositoryInstance
	const projectionsReducersRepository = params.projections.reducers.repository;
	const projectionsReducersService = Core.Projections.Reducers.Service(projectionsReducersRepository);
	const projectionsReducersDefinitionsRepository = params.projections.reducers.definitions.repository;
	const projectionsReducersDefinitionsService = Core.Projections.Reducers.Definitions.Service(projectionsReducersDefinitionsRepository);

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
				Controller: Core.Commands.Reducers.Controller(commandsReducersDefinitionsService)(commandsReducersService),
				Definitions: {
					Repository: commandsReducersDefinitionsRepository,
					Service: Core.Commands.Reducers.Definitions.Service(commandsReducersDefinitionsRepository),
				},
				Repository: commandsReducersRepository,
				Service: commandsReducersService,
			}
		},
		Events: {
			Repository: eventsRepository,
			Service: Core.Events.Service(eventsRepository),
			MessageBus: Events.MessageBus(),
			Reducers: {
				Controller: Core.Events.Reducers.Controller(eventsReducersDefinitionsService)(eventsReducersService),
				Definitions: {
					Repository: eventsReducersDefinitionsRepository,
					Service: Core.Events.Reducers.Definitions.Service(eventsReducersDefinitionsRepository),
				},
				Repository: eventsReducersRepository,
				Service: eventsReducersService,
			}
		},
		Projections: {
			RepositoriesRepository: Projections.RepositoriesRepositoryInstance,
			ServicesService: Core.Projections.ServicesService(projectionsRepositoriesRepository),
			Reducers: {
				Controller: Core.Projections.Reducers.Controller(projectionsReducersDefinitionsService)(projectionsReducersService),
				Definitions: {
					Repository: projectionsReducersDefinitionsRepository,
					Service: Core.Projections.Reducers.Definitions.Service(projectionsReducersDefinitionsRepository),
				},
				Repository: projectionsReducersRepository,
				Service: projectionsReducersService,
			}
		},
	}
}