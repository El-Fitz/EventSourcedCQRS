/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-23 23:25:58 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-06-15 22:39:48
 */

import * as Core from "../../Core";
import { projectionRepositoryFactory } from './_projections-repository.factory';

export const projectionServiceFactory = (): Core.ServiceInterface => {
	let repository = projectionRepositoryFactory();
	return Core.Service(repository);
}