node-cratejoy
==============

A small node module that helps integration your application with cratejoy.
There is still several API endpoints with cratejoy that is not implemented in this implementation.
Feel free to fork and make pull requests, or adding issues as you please.

## Install

```npm install node-cratejoy```

If you don't already have `request` be sure to also do:  
```npm install request```

`request` isn't included as a dependency since it is a common module and I didn't want to require a different version than you already installed. If you don't think this a good idea, please open an issue and I'll add it as a dependency.

## Usage

After having installed it, simply require it, set it up with your own clientId and clientSecret, and start calling methods!

```javascript
var cratejoyAPI = require('node-cratejoy');
var cratejoy = new cratejoyAPI(
  'clientId',
  'clientSecret');

cratejoy.callMethods();
```

### Functions and responses
| Functions | Returns to callback | Explanation |
| ---------------- | ---------------- | ---------------- |
| **get** (link, options, callback) | callback(err, res, body) | Base function for using get on cratejoy API. Can be used if non-implemented API call needed. |
| **put** (link, data, callback) | callback(err, res, body)| Base function for using put on cratejoy API. Can be used if non-implemented API call needed. |
| **post** (link, data, callback) | callback(err, res, body) | Base function for using post on cratejoy API. Can be used if non-implemented API call needed. |
| **del** (link, options, callback) | callback(err, res, body) | Base function for using delete on cratejoy API. Can be used if non-implemented API call needed. |
| **getSubscriptions** ([options], callback) | callback(err, res, body) | Gets all subscriptions matching filters set in options.  |
| **getSubscription** (id, callback) | callback(err, res, body) | Gets subscription by id.  |
| **updateSubscription** ([id], data, callback) | callback(err, res, body) | Update subscription with id (could also be in data). Only [documented fields](http://docs.cratejoydev.apiary.io/#reference/subscription/subscription/edit-an-subscription) supported.  |
| **getSubscriptionMetadata** (id, callback) | callback(err, res, body) | Gets all metadata for a subscription by subscription id.  |
| **updateSubscriptionMetadata** ([id], data, callback) | callback(err, res, body) | Replaces all metadata for a subscription by subscription id.  |
| **addNoteToSubscription** ([id], note, callback) | callback(err, res, body) | Update/Set a note for the subscription by subscription id.  |
| **getProducts** ([options], callback) | callback(err, res, body) | Gets all products matching filters set in options.  |
| **getProduct** (id, callback) | callback(err, res, body) | Gets product by id.  |
| **updateProduct** ([id], data, callback) | callback(err, res, body) | Update product with id (could also be in data). Only [documented fields](http://docs.cratejoydev.apiary.io/#reference/products/product/edit-a-product) supported.  |
| **getProductMetadata** (id, callback) | callback(err, res, body) | Gets all metadata for a product by product id.  |
| **updateProductMetadata** ([id], data, callback) | callback(err, res, body) | Replaces all metadata for a product by product id.  |
| **toggleProduct** (id, visible, callback) | callback(err, res, body) | Sets the product's visiblity to the specific value by product id.  |
| **getOrders** ([options], callback) | callback(err, res, body) | Gets all orders matching filters set in options.  |
| **getOrder** (id, callback) | callback(err, res, body) | Gets order by id.  |
| **updateOrder** ([id], data, callback) | callback(err, res, body) | Update order with id (could also be in data). Only [documented fields](http://docs.cratejoydev.apiary.io/#reference/order/order/edit-an-order) supported.  |
| **getOrderMetadata** (id, callback) | callback(err, res, body) | Gets all metadata for an order by order id.  |
| **updateOrderMetadata** ([id], data, callback) | callback(err, res, body) | Replaces all metadata for an order by order id.  |
| **addNoteToOrder** ([id], note, callback) | callback(err, res, body) | Update/Set a note for the order by order id.  |
| **getCustomers** ([options], callback) | callback(err, res, body) | Gets all customers matching filters set in options.  |
| **getCustomer** (id, callback) | callback(err, res, body) | Gets customer by id.  |
| **updateCustomer** ([id], data, callback) | callback(err, res, body) | Update customer with id (could also be in data). Only [documented fields](http://docs.cratejoydev.apiary.io/#reference/customer/customer/edit-an-customer) supported.  |
| **getCustomerMetadata** (id, callback) | callback(err, res, body) | Gets all metadata for a customer by customer id.  |
| **updateCustomerMetadata** ([id], data, callback) | callback(err, res, body) | Replaces all metadata for a customer by customer id.  |
| **addNoteToCustomer** ([id], note, callback) | callback(err, res, body) | Update/Set a note for the customer by customer id.  |
| **getShipments** ([options], callback) | callback(err, res, body) | Gets all shipments matching filters set in options.  |
| **getShipment** (id, callback) | callback(err, res, body) | Gets shipment by id.  |
| **updateShipment** ([id], data, callback) | callback(err, res, body) | Update shipment with id (could also be in data). Only [documented fields](http://docs.cratejoydev.apiary.io/#reference/shipment/shipment/edit-an-shipment) supported.  |

## Examples

### Getting A Subscription
```javascript
cratejoy.getSubscription(12345, function(err, res, body){
  if(err) throw err;
  console.log('Got subscription');
  console.log(body);
});
```
### Updating A Subscription
```javascript
var subscriptionUpdate = {
  end_date: '12/27/2014',
  note: 'Updated end date so that customer didn\'t need to cancel to change their billing date.',
  credit: 0
}

cratejoy.updateSubscription(12345, subscriptionUpdate, function(err, res, body){
  //Handle the callback.
});
```
