/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 00:57:07
 */

import * as Commands from "../../";
import * as Events from "../../../Events";

export type CommandReducer = (command: Commands.Command) => Promise<Events.Event[]>;