import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {productDetailsReducer, productListReducer} from './reducers/productReducers'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
})

const initialState = {}

const middleWare = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store
