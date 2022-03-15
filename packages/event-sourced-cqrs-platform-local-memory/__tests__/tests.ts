/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 01:53:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-15 19:25:24
 */

import { Tests } from "event-sourced-cqrs-core"
import { Aggregates, Commands, Events, Projections, PlatformFactory, PlatformParams } from "../src/index.js";

const platformParams: PlatformParams = {
	aggregates: {
		reducers: {
			definitions: {
				repository: Aggregates.Reducers.Definitions.Repository({ })
			},
			repository: Aggregates.Reducers.RepositoryInstance,
		}
	},
	commands: {
		reducers: {
			definitions: {
				repository: Commands.Reducers.Definitions.Repository({ })
			},
			repository: Commands.Reducers.RepositoryInstance,
		}
	},
	events: {
		reducers: {
			definitions: {
				repository: Events.Reducers.Definitions.Repository({ })
			},
			repository: Events.Reducers.RepositoryInstance,
		},
	},
	projections: {
		reducers: {
			definitions: {
				repository: Projections.Reducers.Definitions.Repository({ })
			},
			repository: Projections.Reducers.RepositoryInstance,
		}
	}
};

Tests.TestController({
	parameters: platformParams,
	factory: PlatformFactory
});