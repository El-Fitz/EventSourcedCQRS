/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-17 01:04:10 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2022-03-12 15:25:31
 */

import { Core } from "event-sourced-cqrs-core";
import { DynamoDB } from 'aws-sdk'

export const AggregateReducersDefinitionsRepository = (tableName: string, repository: DynamoDB.DocumentClient): Core.Aggregates.Reducers.Definitions.Repository => {
	return ({
		create: (aggregateReducerDefinition: Core.Aggregates.Reducers.Definitions.Definition) => {
			const params = {
				TableName: tableName,
				Item: {
					id: aggregateReducerDefinition.id,
					creationDate: aggregateReducerDefinition.creationDate,
					triggeringEventId: aggregateReducerDefinition.triggeringEventId,
					requiredAggregates: aggregateReducerDefinition.requiredAggregates
				},
				ConditionExpression?: ConditionExpression;
				ExpressionAttributeNames?: ExpressionAttributeNameMap;
				ExpressionAttributeValues?: ExpressionAttributeValueMap;
			}
			return repository
				.put(params)
				.promise()
				.then((result) => {
					if (result.$response.error) {
						return Promise.reject(result.$response.error);
					}
					return Promise.resolve(aggregateReducerDefinition);
				});
		},
		get: (id: Core.Types.UUID) => {
			const params = {
				TableName: tableName,
				/**
				 * A map of attribute names to AttributeValue objects, representing the primary key of the item to retrieve. For the primary key, you must provide all of the attributes. For example, with a simple primary key, you only need to provide a value for the partition key. For a composite primary key, you must provide values for both the partition key and the sort key.
				 */
				Key: Key;
				/**
				 * A string that identifies one or more attributes to retrieve from the table. These attributes can include scalars, sets, or elements of a JSON document. The attributes in the expression must be separated by commas. If no attribute names are specified, then all attributes are returned. If any of the requested attributes are not found, they do not appear in the result. For more information, see Specifying Item Attributes in the Amazon DynamoDB Developer Guide.
				 */
				ProjectionExpression?: ProjectionExpression;
				/**
				 * One or more substitution tokens for attribute names in an expression. The following are some use cases for using ExpressionAttributeNames:   To access an attribute whose name conflicts with a DynamoDB reserved word.   To create a placeholder for repeating occurrences of an attribute name in an expression.   To prevent special characters in an attribute name from being misinterpreted in an expression.   Use the # character in an expression to dereference an attribute name. For example, consider the following attribute name:    Percentile    The name of this attribute conflicts with a reserved word, so it cannot be used directly in an expression. (For the complete list of reserved words, see Reserved Words in the Amazon DynamoDB Developer Guide). To work around this, you could specify the following for ExpressionAttributeNames:    {"#P":"Percentile"}    You could then use this substitution in an expression, as in this example:    #P = :val     Tokens that begin with the : character are expression attribute values, which are placeholders for the actual value at runtime.  For more information on expression attribute names, see Specifying Item Attributes in the Amazon DynamoDB Developer Guide.
				 */
				ExpressionAttributeNames?: ExpressionAttributeNameMap;
			}
			return repository.get(params);
		},
		query: (event: Core.Events.Event) => Promise.resolve(Object.values(repository).filter((definition) => definition.triggeringEventId === event.id)),
		delete: (id: Core.Types.UUID) => {
			delete repository[id];
			return Promise.resolve();
		}
	})
}

export const AggregateReducersDefinitionsRepositoryInstance = AggregateReducersDefinitionsRepository();