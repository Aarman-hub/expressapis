const Order = require("../models/order");
const OrderItem = require("../models/order-item");


exports.getOrders = async (req, res) =>{
    const order = await Order.find().populate('user','name');

    if(!order) return res.status(400).json({success: false});

    res.send(order);
}

exports.getOrdersById = async (req, res) =>{
    const order = await Order.findById(req.params.id)
        .populate('user','name')
        .populate({path:'orderItems', populate:{ path:"product", populate:"categroy"}});

    if(!order) return res.status(400).json({success: false});

    res.send(order);
}

exports.createOrder = async (req, res) =>{
    const {
        orderItems,
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        status,
        totalPrice,
        user,
    } = req.body;


    const orderItemsIds = Promise.all(orderItems.map(async (orderItem)=>{
        let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product,
            });

        newOrderItem = await newOrderItem.save();
        
        return newOrderItem._id;
    }));

    const allOrderItems = await orderItemsIds;


    let order = new Order({
        orderItems: allOrderItems,
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        status,
        totalPrice,
        user,
    });

    order = await order.save();

    if(!order) return res.status(400).send("Order not created!");

    res.send(order)
}

exports.updateOrder = async (req, res) =>{
    const order = await Order.findByIdAndUpdate(
        req.params.id, 
        {
            status: req.body.status
        },
        {
            new:true
        }
    );
    if(!order) return res.status(400).send('Order cant not be updated!');

    res.send(order);
}

exports.deleteOrder = (req, res) =>{

    const id = req.params.id;
    Order.findByIdAndRemove(id)
            .then(order=>{
                if(order){

                    order.orderItems.map(async orderItem =>{
                        await OrderItem.findByIdAndRemove(orderItem);
                    })
                    return res.status(500).json({success: true, msg:"Order deleted"})
                }else{
                    return res.status(500).json({success: false, msg: "Order do not deleted"})
                }
            })
            .catch(err=>{
                return res.status(500).json({success: false, error: err})
            })
}