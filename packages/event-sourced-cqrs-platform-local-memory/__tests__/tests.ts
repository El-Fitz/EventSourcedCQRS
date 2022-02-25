/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 01:53:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-30 02:00:26
 */

import test from 'ava';
import * as Core from "event-sourced-cqrs-core"
import { Platform } from "../src/index.js";

const platform = Platform();

Core.Tests.RunTests(platform)(test);
