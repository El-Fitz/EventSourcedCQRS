/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-26 18:45:11
 */

import Aggregates from "../../Aggregates";
import Events from "../";

export type EventReducer = (event: Events.Event) => (aggregates: Aggregates.Aggregate[]) => Promise<Events.Event[]>;