/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:52:20
 */

import * as Aggregates from "../Aggregates";
import * as Commands from "../Commands";
import * as Events from "../Events";

export interface ObservabilityRepository {
	logAggregate: (aggregate: Aggregates.Aggregate) => Promise<void>;
	logCommand: (command: Commands.Command) => Promise<void>;
	logEvent: (event: Events.Event) => Promise<void>;
}