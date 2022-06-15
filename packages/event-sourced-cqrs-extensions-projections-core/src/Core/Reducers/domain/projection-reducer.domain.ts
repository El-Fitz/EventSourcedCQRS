/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:24:19 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 21:33:07
 */

import { Core } from "event-sourced-cqrs-core";
import * as Projections from "../.."

export type ProjectionReducer = (event: Core.Events.Event) => (aggregates: Core.Aggregates.Aggregate[]) => Promise<Projections.Projection>;