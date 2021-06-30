/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-28 19:03:17 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 01:25:43
 */

import * as Core from "event-sourced-cqrs-core"
import { PlatformInterface } from "event-sourced-cqrs-core"

export * as Aggregates from "./Aggregates";
export * as Commands from "./Commands";
export * as Events from "./Events";

import * as Aggregates from "./Aggregates";
import * as Commands from "./Commands";
import * as Events from "./Events";

export const Platform = (): PlatformInterface => {
	const aggregatesRepositoriesRepository = Aggregates.RepositoriesRepositoryInstance
	const aggregatesReducersDefinitionsRepository = Aggregates.Reducers.Definitions.RepositoryInstance

	const commandsRepository = Commands.Repository()
	const commandsReducersDefinitionsRepository = Commands.Reducers.Definitions.RepositoryInstance

	const eventsRepository = Events.Repository()
	const eventsReducersDefinitionsRepository = Events.Reducers.Definitions.RepositoryInstance

	return {
		Aggregates: {
			RepositoriesRepository: Aggregates.RepositoriesRepositoryInstance,
			ServicesService: Core.Aggregates.ServicesService(aggregatesRepositoriesRepository),
			Reducers: {
				Definitions: {
					Repository: aggregatesReducersDefinitionsRepository,
					Service: Core.Aggregates.Reducers.Definitions.Service(aggregatesReducersDefinitionsRepository),
				}
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
		}
	}
}