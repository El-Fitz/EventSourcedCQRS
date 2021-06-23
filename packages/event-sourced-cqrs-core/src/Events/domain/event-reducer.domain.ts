/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:26:20 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:51:18
 */

import Aggregates from "../../Aggregates";
import Events from "../";

// TODO: Figure out if there's a better way than this for the generic generatedEvents
export type EventReducer = (event: Events.Event) => (aggregates: Aggregates.Aggregate[]) => Events.Event[];