import React from 'react';
import { Card, Tabs } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

//function
import {
    addToWishList,
} from '../functions/users';

//lodash
import _ from 'lodash';

const { Meta } = Card;
const { TabPane } = Tabs;


const SingleProductCard = ({ product }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));
    const { _id, title, description, price, sold, quantity, images, category } = product;

    const handleAddTOCart = () => {
        let cart = [];
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...product,
            count: 1
        })
        let unique = _.uniqWith(cart, _.isEqual)
        localStorage.setItem('cart', JSON.stringify(unique));
        dispatch({
            type: "ADD_TO_CART",
            payload: unique
        });
        dispatch({
            type: "SET_VISIBLE",
            payload: true
        });
    }

    const handleAddToWishList = (e) => {
        if (user) {
            addToWishList(user.token, _id)
                .then((res) => {
                    console.log(res.data);
                    toast.success('Add To WishList Success!');
                }).catch((err) => {
                    console.log(err.response.data);
                });
        } else {
            toast.error('Go to Login!')
        }

    }

    return (
        <>
            <div className='col-md-7'>
                <Carousel autoPlay showArrows={true} infiniteLoop>
                    {images && images.map(item => <img src={item.url} key={item.public_id} />)}
                </Carousel>
                <Tabs>
                    <TabPane tab="Description" key="1">
                        {description}
                    </TabPane>
                    <TabPane tab="More..." key="2">
                        More...
                    </TabPane>
                </Tabs>
            </div>
            <div className='col-md-5'>
                <h1 className='bg-info p-3'>{title}</h1>
                <Card
                    actions={[
                        <a onClick={handleAddToWishList}>
                            <HeartOutlined
                                className='text-info' /><br />
                            Add to wishlist
                        </a>
                        ,
                        <>
                            <a onClick={handleAddTOCart}>
                                <ShoppingCartOutlined
                                    className='text-danger' />
                                <br />
                                Add to cart
                            </a>
                        </>
                        ,

                    ]}
                >
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            Price
                            <span className='float-end'>{price}</span>
                        </li>
                        <li class="list-group-item">
                            Quantity
                            <span className='float-end'>{quantity}</span>
                        </li>
                        <li class="list-group-item">
                            Sold
                            <span className='float-end'>{sold}</span>
                        </li>
                        {category &&
                            <li class="list-group-item">
                                Category
                                <span className='float-end'>{category.name}</span>
                            </li>
                        }
                    </ul>

                </Card>
            </div>


        </>
    )
}

export default SingleProductCard;