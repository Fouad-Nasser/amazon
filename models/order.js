const mongoose = require("mongoose")
const orderSchema = mongoose.Schema(
    [
        {
            shippingInfo: {
                address: {
                    type: String,
                    required: true
                },
                city: {
                    type: String,
                    required: true
                },
                phoneNo: {
                    type: String,
                    required: true
                },
                postalCode: {
                    type: String,
                    required: true
                },
                country: {
                    type: String,
                    required: true
                }
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            orderItems: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    },
                    image: {
                        type: String,
                        required: true
                    },
                    price: {
                        type: Number,
                        required: true
                    },
                    color: {
                        type: String,
                        required: true
                    },
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Product'
                    }
                }
            ],
            paymentInfo: {
                id: {
                    type: String
                },
                status: {
                    type: String
                }
            },
            paidAt: {
                type: Date
            },

            itemsPrice: {
                type: Number,
                required: true,
            },
            taxPrice: {
                type: Number,
                required: true,
            },
            shippingPrice: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            },
            orderStatus: {
                type: String,
                required: true,
            },
            deliveredAt: {
                type: Date
            },
            createdAt: {
                type: Date,
            }

        }
    ]

)

const orderModel=mongoose.model("order",orderSchema)

module.exports=orderModel