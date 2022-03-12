/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 02:02:50 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 14:25:53
 */

export { default as Basic } from "./0-basics.tests"
export { default as Get } from "./2-get.tests"
export { default as Query } from "./3-query.tests"

import Basic from "./0-basics.tests"
import Create from './1-create.tests';
import Get from "./2-get.tests"
import Query from "./3-query.tests"
import Delete from "./4-delete.tests";

export const TestSuites = [
	Basic,
	Create,
	Get.RunTests,
	Query.RunTests,
	Delete,
];