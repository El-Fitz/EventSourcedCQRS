/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:24:19 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:47:42
 */

import Aggregates from "./";
import Events from "../../Events";

export type AggregateReducer = (event: Events.Event) => (aggregates: Aggregates.Aggregate[])=> Aggregates.Aggregate;