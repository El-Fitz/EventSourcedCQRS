
import { TestInterface } from 'ava';
import { PlatformInterface } from "../../"

export * as Aggregates from "./Aggregates"

import * as Aggregates from"./Aggregates"

export const RunTests = (platform: PlatformInterface) => (test: TestInterface) => {
	Aggregates.RunTests(platform)(test)
}
