import * as dynamoDbLib from "./libs/dynamodb-lib.js";
import { success, failure } from "./libs/response-lib.js";

export async function main(event, context, callback) {
	const params = {
		TableName: "userData",
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			dateId: event.pathParameters.id
		}
	};

	try {
		const result = await dynamoDbLib.call("get", params);
		if (result.Item) {
			callback(null, success(result.Item));
		} else {
			callback(null, failure({ status: false, error: "Item not found." }));
		}
	} catch (e) {
		console.log("get.js");
		console.log(e);
		callback(null, failure({ status: false}));
	}
}