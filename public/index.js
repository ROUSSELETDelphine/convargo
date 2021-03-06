'use strict';

//list of truckers
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL steps
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(truckers);
console.log(deliveries);
console.log(actors);

for (var i = 0; i < deliveries.length; i++){
  var inf = infTrucker(deliveries[i].truckerId);

  if (deliveries[i].volume > 5 && deliveries[i].volume < 10){
    var priceV= deliveries[i].volume * (inf[1] - inf[1] * 0.1);
  }

  else{
    if (deliveries[i].volume > 10 && deliveries[i].volume < 25){
      var priceV= deliveries[i].volume * (inf[1] - inf[1] * 0.3);
    }
    else {
      if(deliveries[i].volume >= 25){
        var priceV= deliveries[i].volume * (inf[1] - inf[1] * 0.5);
      }

      else {
        var priceV= deliveries[i].volume * inf[1];
      }
    }
  }
  var priceD= deliveries[i].distance * inf[0];
  var price = priceD + priceV;

  console.log("price:" + price);
  var insurance = price * 0.3 / 2;
  var treasury = Math.floor(deliveries[i].distance / 500) + 1;
  var rest = price * 0.3 - insurance - treasury;
  var commission = [insurance, treasury, rest];

  console.log("commission: \ninsurance: " + commission[0] + "\ntreasury: " + commission[1] + "\nrest: " + commission[2]);

  if (deliveries[i].options.deductibleReduction){
    price += deliveries[i].volume;
    console.log("updated price with deductible reduction: " + price);
  }

  var trucker = price - price * 0.3;
  if (deliveries[i].options.deductibleReduction){
    var convargo = rest + deliveries[i].volume;
  }
  else{
    var convargo = rest;
  }
  var payActors =  [price, trucker, insurance, treasury, convargo];

  console.log("actors:\nshipper: " + payActors[0] + "\ntrucker: " + payActors[1] + "\ninsurance: " + payActors[2] + "\ntreasury: " + payActors[3] + "\nconvargo: " + payActors[4]);
  console.log("\n");
}



function infTrucker(id){
  for (var i = 0; i < truckers.length; i++){
    if (id == truckers[i].id){
      return [truckers[i].pricePerKm, truckers[i].pricePerVolume];
    }
  }
}
