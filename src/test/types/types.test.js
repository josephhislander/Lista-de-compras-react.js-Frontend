import { types } from "../../types/types"


describe('Tests in types', () => {
    
    test('Should match', () => {
        
        expect(types).toEqual({

            authLogin: '[auth] Login',
            authLogout: '[auth] Logout',
        
            eventNewList: '[event] New List',
            eventDeleteList: '[event] Delete List',
            eventUpdateList: '[event] Update List',
            eventNewActiveList: '[event] New Active List',
            eventUpdateListBudge: '[event] Update Product Budge',
        
            eventNewProduct: '[event] New Product',
            eventDeleteProduct: '[event] Delete Product',
            eventNewActiveProduct: '[event] New Active Product',
            eventUpdateProductPrice: '[event] Update Product Price',
            eventCheckProduct: '[event] Check Product',
        
        })

    })
    
})
