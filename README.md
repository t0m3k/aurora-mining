# WELCOME TO ePOS BY AURORA STUDIO

## What it is?

Now it's interactive pricelist including cost of items, labour and minimum price. In future it will be whole ePOS where you'll be able to add customers, create receipts and print/download them.

## What you need?

- node.js - https://nodejs.org
- mongoDB database - https://www.mongodb.com

## HOW TO START

0. `clone https://github.com/t0m3k/ePOS.git`
1. Rename `_local_conf.js` to `local_conf.js`.
2. Edit `local_conf.js` and change `host`, `port` and `mongoDB` to your values.
3. Install all npm packages with `npm install`
4. Run `node app.js`
5. ...
6. **PROFIT**

## API routes

### /api

*GET*: Current user privileges


### /api/pricelist

*GET*: Get all pricelist models, prices and parts


### /api/pricelist/models

*GET*: Get all pricelist models, prices and parts

*POST*: Create new model


### /api/pricelist/models/:_id

*GET*: Get model, prices and parts

*UPDATE*: Update model
```javascript
{
    _id: "Model-name",
    name: "Description",
}
```


*POST*: Create new price

```javascript
{
    name: "Screen assembly",
    labour: "50",
    parts: [
        {
            _id: "part-identifier",
            description: "One of the parts needed for screen",
            cost: "10",
            amount: 1,
        },
        {
            _id: "other-part-identifier",
            description: "Other part needed for screen",
            cost: "5",
            amount: 3,
        }
    ],
    min: 50,
    second: 15
}
```