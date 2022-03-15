/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 16:00:32
 */

import { Core } from '../../';

export interface ObservabilityRepository {
	logAggregate: (aggregate: Core.Aggregates.Aggregate) => Promise<void>;
	logCommand: (command: Core.Commands.Command) => Promise<void>;
	logEvent: (event: Core.Events.Event) => Promise<void>;
}