/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-30 01:53:48 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 18:10:57
 */

import test from 'ava';
import * as Core from "event-sourced-cqrs-core"
import { Aggregates, Commands, Events, Projections, PlatformFactory, PlatformParams } from "../src/index.js";

const platformParams: PlatformParams = {
	aggregates: {
		reducers: {
			definitions: {
				repository: Aggregates.Reducers.Definitions.Repository(
					[
						...Core.Tests.Unit.Aggregates.Reducers.Definitions.Repository.Get.testDefinitions.map(({ definitionsToLoad }) => definitionsToLoad),
						...Core.Tests.Unit.Aggregates.Reducers.Definitions.Repository.Query.testDefinitions.map(({ definitionsToLoad }) => definitionsToLoad),
						...Core.Tests.Unit.Aggregates.Reducers.Definitions.Service.Get.testDefinitions.map(({ definitionsToLoad }) => definitionsToLoad),
						...Core.Tests.Unit.Aggregates.Reducers.Definitions.Service.Query.testDefinitions.map(({ definitionsToLoad }) => definitionsToLoad),
					].reduce((acc, items) => acc.concat(items))
					.reduce((acc, definition) => {
						acc[definition.id] = definition;
						return acc;
					}, { } as { [key: string]: Core.Aggregates.Reducers.Definitions.Definition})
				)
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
const platform = PlatformFactory(platformParams);

Core.Tests.RunTests(platform)(test);
