/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:51 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 16:01:07
 */

import { Core } from '../..';
import Observability from ".";

export interface ObservabilityServiceInterface {
	logAggregate: (aggregate: Core.Aggregates.Aggregate) => Promise<void>;
	logCommand: (command: Core.Commands.Command) => Promise<void>;
	logEvent: (event: Core.Events.Event) => Promise<void>;
}

export const ObservabilityService = (repositories: Observability.Repository[]): ObservabilityServiceInterface => ({
	logAggregate: (aggregate: Core.Aggregates.Aggregate) => Promise.all(repositories.map((repository) => repository.logAggregate(aggregate))).then(() => { }),
	logCommand: (command: Core.Commands.Command) => Promise.all(repositories.map((repository) => repository.logCommand(command))).then(() => { }),
	logEvent: (event: Core.Events.Event) => Promise.all(repositories.map((repository) => repository.logEvent(event))).then(() => { }),
})