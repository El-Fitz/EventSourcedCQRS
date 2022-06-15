/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-23 23:25:58 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:10:09
 */

import * as Core from "../../../Core";
import { aggregateRepositoryFactory } from './_aggregates-repository.factory';

export const aggregateServiceFactory = (): Core.Aggregates.ServiceInterface => {
	let repository = aggregateRepositoryFactory();
	return Core.Aggregates.Service(repository);
}