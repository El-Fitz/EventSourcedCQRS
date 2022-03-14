/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-23 23:25:58 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-14 19:10:09
 */

import * as Core from "../../..";
import { projectionRepositoryFactory } from './_projections-repository.factory';

export const projectionServiceFactory = (): Core.Projections.ServiceInterface => {
	let repository = projectionRepositoryFactory();
	return Core.Projections.Service(repository);
}