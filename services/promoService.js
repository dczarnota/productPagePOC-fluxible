var httpRequest = require('../Utils/HttpRequestModule');
var log = require('../Utils/logger');

module.exports = {

  // Actions use this name to call fetchr services
  name: 'getPromoService',

  /*
   * Fetchr requires CRUD interface names
   */
  read: function(req, resource, params, config, callback) {
    var Stopwatch = require('timer-stopwatch');
    var stopwatch = new Stopwatch();
    stopwatch.start();

    var api = "http://api.art.com/EcommerceAPI.svc/jsonp/PromosGetActive?apiKey=328CE70CEB414F77972BB1FA4449E915&sessionId=D6B5E1FC7661477CAFDB5F8D67D4E7BB";
    log.info('Initiating skinny banner get call -->' + stopwatch.ms);
    httpRequest.makeGetRequest(api, null, function(err, promoData) {
      if (!err) {
        log.info('skinny banner get call successful-->' + stopwatch.ms);

        promoData.d.Discount[0].DiscountExpirationDt = new Date(parseInt(promoData.d.Discount[0].DiscountExpirationDt.split("/Date(").pop().split(")/")[0]));
       promoData.d.Discount[0].DiscountExpirationDt = (promoData.d.Discount[0].DiscountExpirationDt.getMonth() + 1) + "/" + promoData.d.Discount[0].DiscountExpirationDt.getDate() + "/" + promoData.d.Discount[0].DiscountExpirationDt.getFullYear().toString().substr(2, 2);
        
        callback(null, promoData.d.Discount[0]);
      } else {
        log.error('skinny banner get call failed => error -->' + stopwatch.ms + err)
      }
    });
  }

};


