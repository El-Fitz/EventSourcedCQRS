/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 02:20:38 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 02:22:25
 */

import Core from "event-sourced-cqrs-core";

export const CommandReducersDefinitionsRepository = (): Core.Commands.Reducers.Definitions.Repository => {

	let repository: { [key: string]: Core.Commands.Reducers.Definitions.Definition } =  { };

	return ({
		create: (aggregateReducerDefinition: Core.Commands.Reducers.Definitions.Definition) => {
			repository[aggregateReducerDefinition.id] = aggregateReducerDefinition;
			return Promise.resolve(aggregateReducerDefinition);
		},
		get: (id: Core.Types.UUID) => Promise.resolve([repository[id]]),
		query: (command: Core.Commands.Command) => Promise.resolve(Object.values(repository).filter((definition) => definition.triggeringCommandId === command.id)),
		delete: (aggregateReducerDefinition: Core.Commands.Reducers.Definitions.Definition) => {
			delete repository[aggregateReducerDefinition.id]
			return Promise.resolve();
		}
	})
}

export const CommandReducersDefinitionsRepositoryInstance = CommandReducersDefinitionsRepository();