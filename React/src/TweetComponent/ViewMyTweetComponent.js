import React, { Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import PostService from '../services/PostService';
import img1 from '../image/download1.jpg';
import img2 from '../image/download2.webp';
import img3 from '../image/download3.jpg';
import './TweetStyle.css';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom'

class ViewMyTweetComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            showReplyTweet: false,
            showUpdateTweet: false,
            replyTweets: [],
            reply: {},
            message: '',
            error: '',
            layout: 'grid',
            tweetId: '',
            updateTweet: {},
            updateTweetId: '',
            updateBid:false,
            currentProductId:'',
            currentUser:''

        };
        this.itemTemplate = this.itemTemplate.bind(this);

    }
    getReplyTweet(tweetId, tweetMessage) {
        PostService.getReplyTweet(tweetId).then(response => this.setState({ replyTweets: response.data }));
        this.setState({ showReplyTweet: true });
        this.setState({ reply: {} });
        this.setState({ message: tweetMessage });
        this.setState({ tweetId: tweetId });
        this.setState({ error: '' });

    }
    saveReplyTweet() {
        let reply = this.state.reply;
        this.setState({ error: '' });
        if (reply["replyMessage"].length <= 144) {
            reply["tweetMessageId"] = this.state.tweetId;
            reply["loginId"] = localStorage.getItem('loginId');
            console.log(reply["replyMessage"]);
            PostService.saveReplyTweet(reply).then(response => {
                PostService.getReplyTweet(this.state.tweetId).then(response => this.setState({ replyTweets: response.data }));

            });
        }
        else {
            this.setState({ error: 'Message size is long' });
        }

    }
    handleTweetChange = (item, e) => {
        let product = this.state.updateTweet;
        product[item] = e.target.value;
        this.setState({ product })
      }
    displayUpdateTweet(id, tweet) {
        this.setState({ showUpdateTweet: true });
        this.setState({ updateTweet: tweet });
        this.setState({ updateTweetId: id });
    }

    saveUpdateTweet() {
        PostService.updateTweet(this.state.updateTweet, this.state.updateTweetId).then(response => {
            this.setState({ showUpdateTweet: false });
            this.componentDidMount();
        })
    }
    componentDidMount() {
        PostService.getUserTweet().then(response => this.setState({ tweets: response.data }));

    }

    saveLike(username, id) {
        PostService.saveLike(username, id).then(response => { this.componentDidMount() });
    }
    deleteTweet(id) {
        PostService.deleteProduct(id).then(response => { this.componentDidMount() });
    }
    handleBidUpdate(e)
    {
        PostService.updateBidAmount(this.state.currentProductId,this.state.reply["replyMessage"],this.state.currentUser).then(
            response=>{        this.setState({updateBid:false, showReplyTweet:false})})

    }


    renderListItem(data) {
        return (

            <div className="p-col-12 mainContainer">
                <div className="tweet-list-item">
                    <div className="tweet-list-detail">
                        <Link to={`/product/${data.id}`}>
                            <div className="tweet-name">{data.productName}</div>
                            <div className="item-image">
                                <img src={data.category === 'Painting' ? img1 : data.category === "Sculptor" ? img2 : data.category === "Ornament" ? img3 : 'img'} alt="Logo" />
                            </div>
                            <div className="tweet-description">{data.category}&nbsp;&nbsp;</div>
                            <div className="tweet-description"><i>{data.shortDesc}</i>

                            </div>
                        </Link>
                        <div className="tweet-deescription"><b>${data.startingPrice}</b></div>
                        <div className="tweet-deescription">Biding End Date: <i>{data.bidingEndDate}</i></div>
                        <button className='actions' icon="pi pi-comment" title="Bid" onClick={() => this.getReplyTweet(data.id, data.tweetMessage)} >Bid</button>&nbsp; &nbsp;&nbsp;
                        <button title="Like" onClick={() => this.saveLike(data.loginId, data.id)} ><i class="pi pi-heart"></i></button>&nbsp;{data.likeCount}&nbsp; &nbsp;&nbsp;
                        <button title="Update Product" onClick={() => this.displayUpdateTweet(data.id, data)} ><i class="pi pi-user-edit"></i></button>&nbsp; &nbsp;&nbsp;
                        <button title="Delete Product" onClick={() => this.deleteTweet(data.id)} ><i class="pi pi-trash"></i></button>
                    </div>

                </div>
            </div>
        );
    }
    renderFooter(option) {
        if (option == "bid") {
            return (
                <div>
                    <Button label="Close" onClick={(e) => this.onHide(e,"bid")} className="p-button-text" />
                    <Button label="Save" onClick={(e) => this.saveReplyTweet()} autoFocus />
                </div>
            );
        }
        else if (option == "bid-update") {
            return (
                <div>
                    <Button label="Close" onClick={(e) => this.onHide(e,"bid-update")} className="p-button-text" />
                    <Button label="Save" onClick={(e) => this.handleBidUpdate(e)} autoFocus />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Button label="Cancel" onClick={(e) => this.onHide(e,"update")} className="p-button-text" />
                    <Button label="Update" onClick={(e) => this.saveUpdateTweet()} autoFocus />
                </div>
            );

        }
    }
    onHide(e,option) {
        if (option == "bid") {
            this.setState({ showReplyTweet: false });
        }
        else if(option==="bid-update")
        {
            this.setState({ updateBid: false });
        }
        else {
            this.setState({ showUpdateTweet: false });
        }
    }
    handleReplyChange = (e) => {
        let reply = this.state.reply;
        reply["replyMessage"] = e.target.value;
        this.setState({ reply })
    }


    itemTemplate(tweet, layout) {
        if (!tweet) {
            return;
        }

        if (layout === 'grid')
            return this.renderListItem(tweet);

    }

    renderHeader() {
        return (
            <div className="grid">
                <div className="col-12 md:col-4">
                    <div className="center"><h4>Products</h4></div>
                </div>
            </div>
        );
    }
handleUpdateCheck(e,i,p,u)
{
    console.log(i,"index")
    this.setState({updateBid:true,currentProductId:p, currentUser:u})
}

    render() {
        const header = this.renderHeader();

        return (
            <div>
                <div className="dataview-demo">
                    <div className="card">
                        <DataView value={this.state.tweets} layout={this.state.layout} header={header}
                            itemTemplate={this.itemTemplate} paginator rows={4} />


                    </div>
                </div>

                <Dialog header="Enter Bid Amount" footer={this.renderFooter("bid")} visible={this.state.showReplyTweet} style={{ width: '40vw' }} onHide={e=>this.onHide(e,"bid")}>

                    <br /><span>{this.state.message}</span><br />
                    <table className="table table-striped ">
                        {
                            this.state.replyTweets.map((
                                reply,i) =>
                                    <tr key={reply.id}>
                                        
                                         <td>  {reply.loginId} </td>
                                        <td>{reply.replyMessage}</td>
                                        <td><button onClick={e=>this.handleUpdateCheck(e,i,reply.id,reply.loginId)}>Update</button></td>
                                    </tr>)}
                    </table>

                    <br /><span className="error"> {this.state.error}</span>
                    <br /><input placeholder="Enter bid amount" name="post" className="form-control"
                        value={this.state.reply["replyMessage"]} onChange={this.handleReplyChange} />

                </Dialog>
                <Dialog header="Update your Bid Amount" 
                footer={this.renderFooter("bid-update")} 
                visible={this.state.updateBid} style={{width:'40vw'}} onHide={e=>this.onHide(e,"bid-update")}>
                    <input placeholder='enter new bid amount'
                     name="replyMessage" className='form-control'
                     value={this.state.reply["replyMessage"]} onChange={this.handleReplyChange} />
                </Dialog>

                <Dialog header="Edit" footer={this.renderFooter("update")} visible={this.state.showUpdateTweet} style={{ width: '50vw' }}>
                    <br /><input placeholder="Enter Product Name" name="productName" className="form-control"
                        value={this.state.updateTweet["productName"]} onChange={this.handleTweetChange.bind(this, "productName")} />
                    <br /><input placeholder="Enter Short Description" name="shortDesc" className="form-control"
                        value={this.state.updateTweet["shortDesc"]} onChange={this.handleTweetChange.bind(this, "shortDesc")} />
                    <br /><input placeholder="Enter Detailed Description" name="detailedDesc" className="form-control"
                        value={this.state.updateTweet["detailedDesc"]} onChange={this.handleTweetChange.bind(this, "detailedDesc")} />
                    <br /><select placeholder="Select Category" name="category" className="form-control"
                        value={this.state.updateTweet["category"]} onChange={this.handleTweetChange.bind(this, "category")}>
                        <option>Select Category</option>
                        <option>Painting</option>
                        <option>Sculptor</option>
                        <option>Ornament</option>
                    </select>
                    <br /><input placeholder="Enter Starting Price" name="startingPrice" className="form-control"
                        value={this.state.updateTweet["startingPrice"]} onChange={this.handleTweetChange.bind(this, "startingPrice")} />
                    <br /><input placeholder="Enter Bid End Date" name="bidEndDate" className="form-control"
                        value={this.state.updateTweet["bidEndDate"]} onChange={this.handleTweetChange.bind(this, "bidEndDate")} />
                    <br /><span className="error"> {this.state.postError}</span>

                </Dialog>

            </div>
        );
    }
}

export default ViewMyTweetComponent