/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:02:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 14:28:13
 */

export { default as Basic } from "./0-basics.tests"
export { default as Create } from "./1-create.tests"
export { default as Get } from "./2-get.tests"
export { default as Delete } from "./3-delete.tests"

import Basic from "./0-basics.tests"
import Create from "./1-create.tests"
import Get from "./2-get.tests"
import Delete from "./3-delete.tests"

export const TestSuites = [
	Basic,
	Create,
	Get,
	Delete,
];