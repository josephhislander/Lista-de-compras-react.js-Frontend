import { shoppingListReducer } from "../../reducers/shoppingListReducer";
import { types } from "../../types/types";

describe('Tests en el archivo shoppingListReducer.js', () => {
  
    const initialState = {
        lists: [],
        activeList: {}
    }

    test('Debe ejecutar el eventNewList correctamente ', () => {
        
        const action = {type: types.eventNewList,
                        payload:  {estado: true,
                                    fecha: "2022-02-14T00:40:08.781Z",
                                    nombre: "SADF",
                                    presupuesto: 0,
                                    productos: [],
                                    usuario: "6181ff0f446a9813ace703d5",
                                    _id: "6209a4e801065047ec4e40e2"} }

        const resp = shoppingListReducer(initialState, action);

        expect(resp).toEqual( {
            lists: [
              {
                estado: true,
                fecha: '2022-02-14T00:40:08.781Z',
                nombre: 'SADF',
                presupuesto: 0,
                productos: [],
                usuario: '6181ff0f446a9813ace703d5',
                _id: '6209a4e801065047ec4e40e2'
              }
            ],
            activeList: {
              estado: true,
              fecha: '2022-02-14T00:40:08.781Z',
              nombre: 'SADF',
              presupuesto: 0,
              productos: [],
              usuario: '6181ff0f446a9813ace703d5',
              _id: '6209a4e801065047ec4e40e2'
            }
          })


    });

    test('Debe ejecutar el eventGetList correctamente ', () => {
        
        const action = {type: types.eventGetList,
                        payload:  [{estado: true,
                                    fecha: "2022-02-14T00:40:08.781Z",
                                    nombre: "SADF",
                                    presupuesto: 0,
                                    productos: [],
                                    usuario: "6181ff0f446a9813ace703d5",
                                    _id: "6209a4e801065047ec4e40e2"}] }

        const resp = shoppingListReducer(initialState, action);

        expect(resp).toEqual( {
            lists: [
              {
                estado: true,
                fecha: '2022-02-14T00:40:08.781Z',
                nombre: 'SADF',
                presupuesto: 0,
                productos: [],
                usuario: '6181ff0f446a9813ace703d5',
                _id: '6209a4e801065047ec4e40e2'
              }
            ],
            activeList: {}
          })

    });


    test('Debe ejecutar el eventDeleteList correctamente ', () => {
        
        const initialState = {
            lists: [{estado: true,
                fecha: "2022-02-14T00:40:08.781Z",
                nombre: "SADF",
                presupuesto: 0,
                productos: [],
                usuario: "6181ff0f446a9813ace703d5",
                _id: "6209a4e801065047ec4e40e2"},

                {estado: true,
                fecha: "2022-02-14T00:40:08.781Z",
                nombre: "SADF",
                presupuesto: 0,
                productos: [],
                usuario: "6181ff0f446a9813ace703d5",
                _id: "6209a4e801065047ec4e40e3"}
            ],
            activeList: {}
        }

        const action = {type: types.eventDeleteList,
                        payload: { id: "6209a4e801065047ec4e40e3"}  }

        const resp = shoppingListReducer(initialState, action);

        // console.log(resp)

        expect(resp).toEqual( {
            lists: [
              {
                estado: true,
                fecha: '2022-02-14T00:40:08.781Z',
                nombre: 'SADF',
                presupuesto: 0,
                productos: [],
                usuario: '6181ff0f446a9813ace703d5',
                _id: '6209a4e801065047ec4e40e2'
              }
            ],
            activeList: {}
          })
    });

    test('Debe ejecutar el eventUpdateList correctamente ', () => {
        
        const initialState = {
            lists: [{estado: true,
                fecha: "2022-02-14T00:40:08.781Z",
                nombre: "SADF",
                presupuesto: 0,
                productos: [],
                usuario: "6181ff0f446a9813ace703d5",
                _id: "6209a4e801065047ec4e40e2"},

                {estado: true,
                fecha: "2022-02-14T00:40:08.781Z",
                nombre: "SADF",
                presupuesto: 0,
                productos: [],
                usuario: "6181ff0f446a9813ace703d5",
                _id: "6209a4e801065047ec4e40e3"}
            ],
            activeList: {}
        };

        const lista = {
            estado: true,
            fecha: "2022-02-14T00:40:08.781Z",
            nombre: "SADF",
            presupuesto: 0,
            productos: [],
            usuario: "6181ff0f446a9813ace703d5",
            _id: "6209a4e801065047ec4e40e3"
        }

        const productos = [1,2,3,4]

        const action = {type: types.eventUpdateList,
                        payload: { id: "6209a4e801065047ec4e40e3",
                                    list: {
                                        ...lista,
                                        productos
                                        }
                                            }  }

        const resp = shoppingListReducer(initialState, action);


        expect(resp).toEqual(    {
            lists: [
              {
                estado: true,
                fecha: '2022-02-14T00:40:08.781Z',
                nombre: 'SADF',
                presupuesto: 0,
                productos: [],
                usuario: '6181ff0f446a9813ace703d5',
                _id: '6209a4e801065047ec4e40e2'
              },
              {
                estado: true,
                fecha: '2022-02-14T00:40:08.781Z',
                nombre: 'SADF',
                presupuesto: 0,
                productos: [1, 2, 3, 4],
                usuario: '6181ff0f446a9813ace703d5',
                _id: '6209a4e801065047ec4e40e3'
              }
            ],
            activeList: {
              estado: true,
              fecha: '2022-02-14T00:40:08.781Z',
              nombre: 'SADF',
              presupuesto: 0,
              productos: [ 1, 2, 3, 4 ],
              usuario: '6181ff0f446a9813ace703d5',
              _id: '6209a4e801065047ec4e40e3'
            }
          })
    });


    test('Debe ejecutar el eventNewActiveList correctamente ', () => {
        
        const initialState = {
            lists: [{estado: true,
                fecha: "2022-02-14T00:40:08.781Z",
                nombre: "SADF",
                presupuesto: 0,
                productos: [],
                usuario: "6181ff0f446a9813ace703d5",
                _id: "6209a4e801065047ec4e40e2"},

                {estado: true,
                fecha: "2022-02-14T00:40:08.781Z",
                nombre: "SADF",
                presupuesto: 0,
                productos: [],
                usuario: "6181ff0f446a9813ace703d5",
                _id: "6209a4e801065047ec4e40e3"}
            ],
            activeList: {}
        };

        const lista = {
            estado: true,
            fecha: "2022-02-14T00:40:08.781Z",
            nombre: "SADF",
            presupuesto: 0,
            productos: [],
            usuario: "6181ff0f446a9813ace703d5",
            _id: "6209a4e801065047ec4e40e3"
        }


        const action = {type: types.eventNewActiveList,
                        payload: lista  }

        const resp = shoppingListReducer(initialState, action);
  

        expect(resp).toEqual(    {
            lists: [
                {
                  estado: true,
                  fecha: '2022-02-14T00:40:08.781Z',
                  nombre: 'SADF',
                  presupuesto: 0,
                  productos: [],
                  usuario: '6181ff0f446a9813ace703d5',
                  _id: '6209a4e801065047ec4e40e2'
                },
                {
                  estado: true,
                  fecha: '2022-02-14T00:40:08.781Z',
                  nombre: 'SADF',
                  presupuesto: 0,
                  productos: [],
                  usuario: '6181ff0f446a9813ace703d5',
                  _id: '6209a4e801065047ec4e40e3'
                }
              ],
              activeList: {
                estado: true,
                fecha: '2022-02-14T00:40:08.781Z',
                nombre: 'SADF',
                presupuesto: 0,
                productos: [],
                usuario: '6181ff0f446a9813ace703d5',
                _id: '6209a4e801065047ec4e40e3'
              }
          })
    });
    

    test('Debe ejecutar el eventUpdateListBudge correctamente ', () => {
        
        const initialState = {
            lists: [{estado: true,
                fecha: "2022-02-14T00:40:08.781Z",
                nombre: "SADF",
                presupuesto: 0,
                productos: [],
                usuario: "6181ff0f446a9813ace703d5",
                _id: "6209a4e801065047ec4e40e2"},

                {estado: true,
                fecha: "2022-02-14T00:40:08.781Z",
                nombre: "SADF",
                presupuesto: 0,
                productos: [],
                usuario: "6181ff0f446a9813ace703d5",
                _id: "6209a4e801065047ec4e40e3"}
            ],
            activeList: {}
        };

        const activeList = {
            estado: true,
            fecha: "2022-02-14T00:40:08.781Z",
            nombre: "SADF",
            presupuesto: 0,
            productos: [],
            usuario: "6181ff0f446a9813ace703d5",
            id: "6209a4e801065047ec4e40e3"
        }

        const Budget = 1;


        const action = {type: types.eventUpdateListBudge,
                        payload: {
                          id: activeList.id,
                          list: {
                            ...activeList,
                            presupuesto: Budget
                          }
                        }  }

        const resp = shoppingListReducer(initialState, action);
  

        expect(resp).toEqual(    {
            lists: [
                {
                  estado: true,
                  fecha: '2022-02-14T00:40:08.781Z',
                  nombre: 'SADF',
                  presupuesto: 0,
                  productos: [],
                  usuario: '6181ff0f446a9813ace703d5',
                  _id: '6209a4e801065047ec4e40e2'
                },
                {
                  estado: true,
                  fecha: '2022-02-14T00:40:08.781Z',
                  nombre: 'SADF',
                  presupuesto: 1,
                  productos: [],
                  usuario: '6181ff0f446a9813ace703d5',
                  id: '6209a4e801065047ec4e40e3'
                }
              ],
              activeList: {
                estado: true,
                fecha: '2022-02-14T00:40:08.781Z',
                nombre: 'SADF',
                presupuesto: 1,
                productos: [],
                usuario: '6181ff0f446a9813ace703d5',
                id: '6209a4e801065047ec4e40e3'
              }
          })
    });

    test('Debe ejecutar el eventCheckProduct correctamente ', () => {
        
      const initialState = {
        lists: [{estado: true,
            fecha: "2022-02-14T00:40:08.781Z",
            nombre: "SADF",
            presupuesto: 0,
            productos: [],
            usuario: "6181ff0f446a9813ace703d5",
            _id: "6209a4e801065047ec4e40e2"},

            {estado: true,
            fecha: "2022-02-14T00:40:08.781Z",
            nombre: "SADF",
            presupuesto: 0,
            productos: [],
            usuario: "6181ff0f446a9813ace703d5",
            _id: "6209a4e801065047ec4e40e3"}
        ],
        activeList: {}
    };

    const Product = {
      cantidad:1,
      precio:10,
      impuesto:0.07,
      checked:false,
      estado:true,
      _id:"62045b9e0cacee2d94ee6de1",
      nombre:"CAFÉ",
      usuario:"6181ff0f446a9813ace703d5",
      lista:"62045b960cacee2d94ee6de0"
    }

      const Product1 = {
      cantidad:1,
      precio:10,
      impuesto:0.07,
      checked: false,
      estado:true,
      _id:"62045b9e0cacee2d94ee6de3",
      nombre:"CAFÉ",
      usuario:"6181ff0f446a9813ace703d5",
      lista:"62045b960cacee2d94ee6de0"
      }

    const activeList = {estado: true,
      fecha: "2022-02-14T00:40:08.781Z",
      nombre: "SADF",
      presupuesto: 0,
      productos: [Product, Product1],
      usuario: "6181ff0f446a9813ace703d5",
      _id: "6209a4e801065047ec4e40e3"}

     


    const action = {type: types.eventCheckProduct,
                    payload: {
                      id: activeList._id,
                      list: {...activeList,
                                  productos: activeList.productos.map( product => (product._id === Product._id)
                                  ? {...Product,
                                      checked: true
                                  }
                                  :product
                                  )
                              }} 
              }

  const resp = shoppingListReducer(initialState, action);

  expect(resp).toEqual( {
    lists: [
      {
        estado: true,
        fecha: '2022-02-14T00:40:08.781Z',
        nombre: 'SADF',
        presupuesto: 0,
        productos: [],
        usuario: '6181ff0f446a9813ace703d5',
        _id: '6209a4e801065047ec4e40e2'
      },
      {
        estado: true,
        fecha: '2022-02-14T00:40:08.781Z',
        nombre: 'SADF',
        presupuesto: 0,
        productos: [
          {
          cantidad:1,
          precio:10,
          impuesto:0.07,
          checked:true,
          estado:true,
          _id:"62045b9e0cacee2d94ee6de1",
          nombre:"CAFÉ",
          usuario:"6181ff0f446a9813ace703d5",
          lista:"62045b960cacee2d94ee6de0"
        }, 
        {
          cantidad:1,
          precio:10,
          impuesto:0.07,
          checked: false,
          estado:true,
          _id:"62045b9e0cacee2d94ee6de3",
          nombre:"CAFÉ",
          usuario:"6181ff0f446a9813ace703d5",
          lista:"62045b960cacee2d94ee6de0"
          }
      ],
        usuario: '6181ff0f446a9813ace703d5',
        _id: '6209a4e801065047ec4e40e3'
      }
    ],
    activeList: {
      estado: true,
      fecha: '2022-02-14T00:40:08.781Z',
      nombre: 'SADF',
      presupuesto: 0,
      productos: [ 
        {
          cantidad:1,
          precio:10,
          impuesto:0.07,
          checked:true,
          estado:true,
          _id:"62045b9e0cacee2d94ee6de1",
          nombre:"CAFÉ",
          usuario:"6181ff0f446a9813ace703d5",
          lista:"62045b960cacee2d94ee6de0"
        }, 
        {
          cantidad:1,
          precio:10,
          impuesto:0.07,
          checked: false,
          estado:true,
          _id:"62045b9e0cacee2d94ee6de3",
          nombre:"CAFÉ",
          usuario:"6181ff0f446a9813ace703d5",
          lista:"62045b960cacee2d94ee6de0"
          }
      ],
      usuario: '6181ff0f446a9813ace703d5',
      _id: '6209a4e801065047ec4e40e3'
    }
    
  } )

    })

    test('Debe ejecutar el eventLogout correctamente ', () => {
        
       

      const action = {type: types.eventLogout}

      const resp = shoppingListReducer(initialState, action);

      expect(resp).toEqual( initialState)


  });

  
    // revisar acción event update list
});


