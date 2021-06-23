/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:51 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:52:24
 */

import Aggregates from "../Aggregates";
import Commands from "../Commands";
import Events from "../Events";
import Observability from "./";

export interface ObservabilityServiceInterface {
	logAggregate: (aggregate: Aggregates.Aggregate) => Promise<void>;
	logCommand: (command: Commands.Command) => Promise<void>;
	logEvent: (event: Events.Event) => Promise<void>;
}

export const ObservabilityService = (repositories: Observability.Repository[]): ObservabilityServiceInterface => ({
	logAggregate: (aggregate: Aggregates.Aggregate) => Promise.all(repositories.map((repository) => repository.logAggregate(aggregate))).then(() => { }),
	logCommand: (command: Commands.Command) => Promise.all(repositories.map((repository) => repository.logCommand(command))).then(() => { }),
	logEvent: (event: Events.Event) => Promise.all(repositories.map((repository) => repository.logEvent(event))).then(() => { }),
})