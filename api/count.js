'use strict';

const countapi = require('countapi-js');

module.exports.hit = async (event, context, callback) => {

    let totalizador;

    totalizador = await countapi.hit('desafio-back', 'visits').then((result) => {
      return result.value;
    });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
        message: totalizador,
        input: event,
    }),
  };

  callback(null, response);

};


module.exports.get = async (event, context, callback) => {
  const totalizador = await countapi.get('desafio-back', 'visits').then((result) => {
    return result.value;
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
        message: totalizador,
        input: event,
    }),
  };

  callback(null, response);

};

