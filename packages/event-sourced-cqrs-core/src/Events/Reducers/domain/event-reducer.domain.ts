/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 00:43:49
 */

import * as Aggregates from "../../../Aggregates";
import * as Events from "../../";

export type EventReducer = (event: Events.Event) => (aggregates: Aggregates.Aggregate[]) => Promise<Events.Event[]>;