import React, { useEffect, useState } from 'react';
import PostService from '../services/PostService';
import HeaderComponent from './HeaderComponent';
import './Style.css'
const ProductInformation = (props) => {
    const [data, setData] = useState({})
    const [bids, setBids] = useState([])
    useEffect(() => {
        var id = (window.location.pathname).split('/')[2];
        PostService.showBids(id).then(response => { setData(response.data); setBids(response.data.bids) })

    }, [])
    return (<>
       
        <HeaderComponent />

        <div className="container-fluid">
            <div className='product-header'><b>Product Details</b></div>
            <div className="row">
                <div className="col-sm-4" style={{ border: "1px solid black", textAlign: "center", margin: 10, background: "gray" }}>Product Name</div>
                <div className="col-sm-7" style={{ border: "1px solid black", margin: 10 }}>{data.productName}</div>
            </div>
            <div className="row">
                <div className="col-sm-4" style={{ border: "1px solid black", textAlign: "center", margin: 10, background: "gray" }}>Short Description</div>
                <div className="col-sm-7" style={{ border: "1px solid black", margin: 10 }}>{data.shortDesc}</div>
            </div>
            <div className="row">
                <div className="col-sm-4" style={{ border: "1px solid black", textAlign: "center", margin: 10, background: "gray" }}>Detailed Description</div>
                <div className="col-sm-7" style={{ border: "1px solid black", margin: 10 }}>{data.detailedDesc}</div>
            </div>
            <div className="row">
                <div className="col-sm-4" style={{ border: "1px solid black", textAlign: "center", margin: 10, background: "gray" }}>Category</div>
                <div className="col-sm-7" style={{ border: "1px solid black", margin: 10 }}>{data.category}</div>
            </div>
            <div className="row">
                <div className="col-sm-4" style={{ border: "1px solid black", textAlign: "center", margin: 10, background: "gray" }}>Starting Price</div>
                <div className="col-sm-7" style={{ border: "1px solid black", margin: 10 }}>${data.startingPrice}/-</div>
            </div>
            <div className="row">
                <div className="col-sm-4" style={{ border: "1px solid black", textAlign: "center", margin: 10, background: "gray" }}>Bid End Date</div>
                <div className="col-sm-7" style={{ border: "1px solid black", margin: 10 }}>{data.bidEndDate}</div>
            </div>
            <div className="row">
                <div className='col-sm-2'></div>
                <div className="col-sm-8" style={{ background: "gray", textAlign: "center", margin: 10 }}>Bids</div>
                <div className='col-sm-1'></div>
            </div>
            <div className="row">
                <div className="col-sm-2" style={{ border: "1px solid black", textAlign: "center", margin: 10, background: "gray" }}>Bid Amount</div>
                <div className="col-sm-3" style={{ border: "1px solid black", textAlign: "center", margin: 10, background: "gray" }}>Name</div>
                <div className="col-sm-4" style={{ border: "1px solid black", textAlign: "center", margin: 10, background: "gray" }}>Email</div>
                <div className="col-sm-2" style={{ border: "1px solid black", textAlign: "center", margin: 10, background: "gray" }}>Mobile</div>
            </div>
            
            {bids && bids.map(items => (
                <div className="row">
                    <div className="col-sm-2" style={{ border: "1px solid black", textAlign: "center", margin: 10 }}>${items.replyMessage}</div>
                    <div className="col-sm-3" style={{ border: "1px solid black", textAlign: "center", margin: 10 }}>{items.userdetails.firstName} {items.userdetails.lastName}</div>
                    <div className="col-sm-4" style={{ border: "1px solid black", textAlign: "center", margin: 10, color: 'blue' }}>{items.userdetails.email}</div>
                    <div className="col-sm-2" style={{ border: "1px solid black", textAlign: "center", margin: 10 }}>{items.userdetails.contactNumber?items.userdetails.contactNumber:""}</div>
                </div>
            ))}
        </div>
    </>)

}
export default ProductInformation;