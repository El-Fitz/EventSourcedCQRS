/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:25:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-17 01:51:47
 */

import Commands from "../";
import Events from "../../Events";

export type CommandReducer = (command: Commands.Command) => Events.Event[];