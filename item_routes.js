const express = require('express');
const router = new express.Router();
const shoppingList = require('./fake_db')

router.get('/', (req, resp) => {
    return resp.json(`All items from shopping list: ${ shoppingList }`)
})

router.post('/', (req, resp) => {
    // shoppingListItem = {name: _, price: _}
    let shoppingListItem = req.query
    shoppingList.push(shoppingListItem)

    return resp.json({ added : shoppingListItem })
})

router.get('/:name', (req, resp) => {
    let shoppingListItem = req.params.name

    for(let i =0; i < shoppingList.length; i++){
        if(shoppingListItem == shoppingList[i].name){
            return resp.json({item: shoppingList[i]})
        }
    }
})

router.patch('/:name', (req, resp) => {
    let itemName = req.params.name
    let query = req.query

    for(let i =0; i < shoppingList.length; i++){
        if(itemName == shoppingList[i].name){
            itemName = shoppingList[i];
            shoppingList[i].name = query.name;
            shoppingList[i].price = query.price;
        }
    }
    return resp.json({updated: itemName})
})

router.delete('/:name', (req, resp) => {
    let itemName = req.params.name

    for(let i =0; i < shoppingList.length; i++){
        if(itemName == shoppingList[i].name){
            shoppingList.splice(i,1);
        }
    }
    return resp.json({deleted: itemName})
})

module.exports = router;
