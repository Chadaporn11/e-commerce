import React from 'react';
import BestSeller from '../home/BestSeller';
import NewProduct from '../home/NewProduct';

const Home = () => {
    return (
        <div>
            {/*New Product*/}
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>New Product</h4>
            <NewProduct/>
            
            {/*Best Product*/}
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>Best Seller</h4>
            <BestSeller/>

        </div>
    )
}

export default Home
