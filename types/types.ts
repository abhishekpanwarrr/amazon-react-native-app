export interface User {
    __v: number
    _id: string
    addresses: [
        {
            _id: string
            houseNo: number
            landmark: string
            name: string
            postalCode: number
            street: string
        }
        {
            _id: string
            houseNo: number
            landmark: string
            name: string
            postalCode: number
            street: string
        }
    ]
    createdAt: string
    email: string
    name: string
    orders: []
    password: string
    refreshToken: string
    updatedAt: string
}

export interface Product {
    __v: number
    _id: string
    createdAt: string
    paymentMethod: string
    products: {}
    shippingAddress: {
        houseNo: number
        landmark: string
        name: string
        postalCode: number
        street: string
    }
    totalPrice: number
    updatedAt: string
    user: {
        __v: number
        _id: string
        addresses: []
        createdAt: string
        email: string
        name: string
        orders: []
        password: string
        refreshToken: string
        updatedAt: string
    }
}