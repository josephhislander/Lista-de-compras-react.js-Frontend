import { types } from "../../types/types"


describe('Tests in types', () => {
    
    test('Should match', () => {
        
        expect(types).toEqual({

            authLogin: '[auth] Login',
            authLogout: '[auth] Logout',
            authCheckingFinish: '[auth] Finish checking login state',
        
            eventNewList: '[event] New List',
            eventGetList: '[event] Get Lists',
            eventDeleteList: '[event] Delete List',
            eventUpdateList: '[event] Update List',
            eventNewActiveList: '[event] New Active List',
            eventUpdateListBudge: '[event] Update Product Budge',
        
            eventNewProduct: '[event] New Product',
            eventGetProducts: '[event] Get Products',
            eventDeleteProduct: '[event] Delete Product',
            eventDeleteProducts: '[event] Delete Products',
            eventNewActiveProduct: '[event] New Active Product',
            eventUpdateProductPrice: '[event] Update Product Price',
            eventCheckProduct: '[event] Check Product',
        
            eventLogout: '[event] Logout',
        
        })

    })
    
})
