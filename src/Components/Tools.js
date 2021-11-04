
// search fonction, takes in parameters all the users and the imput of user
export const search = (users, emailValue) => {
        var tmp = [];
        if (emailValue === "") {
            return users
        }
        for (let user in users) {
            if (users[user].Attributes.find(x => x.Name === 'email').Value.startsWith(emailValue) === true) {
                tmp.push(users[user])
            }
        }
        return tmp
}

const modifyNameProducts = (product) => {
    product = product.replaceAll("_", " ")
    product = product.replace("GI", "")
    return product
}

export const searchProduct = (products, productValue) => {
    var tmp = [];
    if (productValue === "") {
        return products
    }
    console.log(products[0])
    for (let product in products) {
        if ((products[product]['name']['S']).toUpperCase().search(productValue.toUpperCase()) !== -1) {
            tmp.push(products[product])
        }
        else if ((modifyNameProducts(products[product]['name']['S'])).toUpperCase().search(productValue.toUpperCase()) !== -1) {
            tmp.push(products[product])
        }
    }
    return tmp
}

// fetch the token from the storage and returns it
export const config = {
    headers: {
        Authorization: localStorage.getItem("Token")
    }
}