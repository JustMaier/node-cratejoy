module.exports = function(clientId, clientSecret){
	var request = require('request'),
		apiUrl = 'https://api.cratejoy.com/v1',
		baseRequest = request.defaults({
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			json:true,
			auth: {
				user: clientId,
				pass: clientSecret
			}
		}),
		deepValue = function (obj, path) {
			for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
				obj = obj[path[i]];
			};
			return obj;
		},
		parsingRegex = /{\s*([\w\.]+)\s*}/g,
		apiRequest = function(parameterizedUrl, fn){
			return function(){
				//Handle optional params
				var id = null,
					options = null,
					callback = null,
					args = [].slice.call(arguments);
				args.forEach(function(arg){
					if(typeof arg == 'number') id = arg;
					if(typeof arg == 'object') options = arg;
					if(typeof arg == 'function') callback = arg;
				})
				if(id != null){
					if(options != null) options.id = id;
					else options = {id: id};
				}

				//Populate URL
				var url = parameterizedUrl.replace(parsingRegex, function(match, path){
					return deepValue(options, path);
				});

				//Remove ID from options
				if(options != null) delete options.id;

				//Rest of the request
				fn(url, options, callback);
			}
		},
		getMethod = function(parameterizedUrl){
			return new apiRequest(parameterizedUrl, function(url, options, callback){
				api.get(url, options, callback);
			})
		},
		putMethod = function(parameterizedUrl){
			return new apiRequest(parameterizedUrl, function(url, data, callback){
				api.put(url, data, callback);
			})
		},
		deleteMethod = function(parameterizedUrl){
			return new apiRequest(parameterizedUrl, function(url, options, callback){
				api.del(url, options, callback);
			})
		}

	var api = {
		get: function(link, options, callback){
			baseRequest({
				url: apiUrl + link,
				qs: options
			}, callback);
		},
		post: function(link, data, callback){
			baseRequest.post({
				url: apiUrl + link,
				json: data
			}, callback);
		},
		put: function(link, data, callback){
			baseRequest.put({
				url: apiUrl + link,
				json: data
			}, callback);
		},
		del: function(link, options, callback){
			baseRequest.del({
				url: apiUrl + link,
				qs: options
			}, callback);
		},
		getSubscriptions: '/subscriptions',
		getSubscription: '/subscriptions/{id}/',
		updateSubscription: '/subscriptions/{id}/',
		getSubscriptionMetadata: '/subscriptions/{id}/metadata',
		updateSubscriptionMetadata: '/subscriptions/{id}/metadata',
		getProducts: '/products',
		getProduct: '/products/{id}/',
		updateProduct: '/products/{id}/',
		getProductMetadata: '/products/{id}/metadata',
		updateProductMetadata: '/products/{id}/metadata',
		getOrders: '/orders',
		getOrder: '/orders/{id}/',
		updateOrder: '/orders/{id}/',
		getOrderMetadata: '/orders/{id}/metadata',
		updateOrderMetadata: '/orders/{id}/metadata',
		getCustomers: '/customers',
		getCustomer: '/customers/{id}/',
		updateCustomer: '/customers/{id}/',
		getCustomerMetadata: '/customers/{id}/metadata',
		updateCustomerMetadata: '/customers/{id}/metadata',
		getShipments: '/shipments',
		getShipment: '/shipments/{id}/',
		updateShipment: '/shipments/{id}/',
		addNoteToOrder: function(id, note, callback){
			api.updateOrder(id, {note: note}, callback);
		},
		addNoteToCustomer: function(id, note, callback){
			api.updateCustomer(id, {note: note}, callback);
		},
		addNoteToSubscription: function(id, note, callback){
			api.updateSubscription(id, {note: note}, callback);
		},
		toggleProduct: function(id, visible, callback){
			api.updateProduct(id, {visible: visible}, callback);
		}
	};

	//Build default methods
	for(method in api){
		if(typeof api[method] == 'function') continue;

		var url = api[method];
		if(method.indexOf('get') == 0) api[method] = new getMethod(url);
		if(method.indexOf('update') == 0) api[method] = new putMethod(url);
		if(method.indexOf('delete') == 0 || method.indexOf('cancel') == 0) api[method] = new deleteMethod(url);
	}

	return api;
}