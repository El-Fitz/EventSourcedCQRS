/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:24:19 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 21:24:18
 */

import { Aggregates } from "../../../"
import * as Projections from "../.."
import * as Events from "../../../Events";

export type ProjectionReducer = (event: Events.Event) => (aggregates: Aggregates.Aggregate[]) => Promise<Projections.Projection>;