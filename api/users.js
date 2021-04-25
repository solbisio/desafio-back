'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

module.exports.get = async (event, context, callback) => {

  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    
    if (result.Item) {
      return {
        statusCode:200,
        body: JSON.stringify(result.Item)
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Não foi possível encontrar o usuário" })
      };
    }

  } catch (err) {
    console.error(err);
    return {
        statusCode: 500,
        body: 'Não foi possível criar o usuário! ' + err,
    };
  }
};

module.exports.create = async (event, context, callback) => {
  const timestamp = new Date().getTime();
  const { email, username } = JSON.parse(event.body);

  const params = {
    TableName: process.env.USERS_TABLE,
    Item: {
      id: uuidv4(),
      username,
      email,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };

  try {
    await dynamoDb.put(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };
  } catch (err) {
    console.error(err);
    return {
        statusCode: 500,
        body: 'Não foi possível criar o usuário! ' + err,
    };
  }
};
