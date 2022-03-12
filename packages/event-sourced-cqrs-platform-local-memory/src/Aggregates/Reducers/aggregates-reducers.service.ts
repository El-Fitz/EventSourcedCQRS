
import * as Core from "event-sourced-cqrs-core";
import { AggregatesReducersRepositoryInstance } from "./aggregates-reducers.repository"

export const AggregateReducersService = () => Core.Aggregates.Reducers.Service(AggregatesReducersRepositoryInstance);