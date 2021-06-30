/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:24:19 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-29 22:50:19
 */

import * as Aggregates from "../.."
import * as Events from "../../../Events";

export type AggregateReducer = (event: Events.Event) => (aggregates: Aggregates.Aggregate[])=> Aggregates.Aggregate;