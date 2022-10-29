import React, { Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import PostService from '../services/PostService';
import img1 from '../image/download1.jpg';
import img2 from '../image/download2.webp';
import img3 from '../image/download3.jpg';
import './TweetStyle.css';
import { Dialog } from 'primereact/dialog';

class ViewTweetComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            showReplyTweet: false,
            replyTweets: [],
            reply: {},
            message: '',
            layout: 'list',
            tweetId: '',
            error: '',
            updateBid:false,
            currentProductId:'',
            currentUser:''

        };
        this.itemTemplate = this.itemTemplate.bind(this);

    }
    getReplyTweet(tweetId, tweetMessage) {
        PostService.getReplyTweet(tweetId).then(response => this.setState({ replyTweets: response.data }));
        this.setState({ showReplyTweet: true });
        this.setState({ message: tweetMessage });
        this.setState({ tweetId: tweetId });
        this.setState({ reply: {} });
        this.setState({ error: '' });

    }
    saveReplyTweet() {
        this.setState({ error: '' });
        let reply = this.state.reply;
        if (reply["replyMessage"].length <= 144) {
            reply["tweetMessageId"] = this.state.tweetId;
            reply["loginId"] = localStorage.getItem('loginId');
            console.log(reply);
            PostService.saveReplyTweet(reply).then(response => {
                PostService.getReplyTweet(this.state.tweetId).then(response => this.setState({ replyTweets: response.data }));

            });
        }
        else {
            this.setState({ error: 'Message size is long' });
        }
    }
    componentDidMount() {
        PostService.getAllTweet().then(response => this.setState({ tweets: response.data }));
    }

    saveLike(username, id) {
        PostService.saveLike(username, id).then(response => { this.componentDidMount() });
    }
    handleBidUpdate(e)
    {
        PostService.updateBidAmount(this.state.currentProductId,this.state.reply["replyMessage"],this.state.currentUser).then
        (response=>{        this.setState({updateBid:false, showReplyTweet:false})})
    }

    renderListItem(data) {
        return (
            <div className="p-col-12 mainContainer">
                <div className="tweet-list-item">
                    <div className="tweet-list-detail">

                        <div className="tweet-name">{data.productName}</div>
                        <div className="item-image">
                            <img src={data.category === 'Painting' ? img1 : data.category === "Sculptor" ? img2 : data.category === "Ornament" ? img3 : 'img'} alt="Logo" />
                        </div>
                        <div className="tweet-description">{data.category}&nbsp;&nbsp;</div>
                        <div className="tweet-description"><i>{data.shortDesc}</i>

                        </div>

                        <div className="tweet-deescription"><b>${data.startingPrice}</b></div>
                        <div className="tweet-deescription">Biding End Date: <i>{data.bidingEndDate}</i></div>
                        <button className='actions' icon="pi pi-comment" title="Bid" onClick={() => this.getReplyTweet(data.id, data.tweetMessage)} >Bid</button>&nbsp; &nbsp;&nbsp;
                        <button title="Like" onClick={() => this.saveLike(data.loginId, data.id)} ><i class="pi pi-heart"></i></button>&nbsp;{data.likeCount}&nbsp; &nbsp;&nbsp;
                        {/* <button title="Update Product" onClick={() => this. displayUpdateTweet(data.id,data.tweetMessage)} ><i class="pi pi-user-edit"></i></button>&nbsp; &nbsp;&nbsp;
                    <button title="Delete Product" onClick={() => this. deleteTweet(data.id)} ><i class="pi pi-trash"></i></button> */}
                    </div>

                </div>
            </div>
        );
    }
    renderFooter(option) {
         if (option == "bid-update") {
            return (
                <div>
                    <Button label="Close" onClick={(e) => this.onHide(e,"bid-update")} className="p-button-text" />
                    <Button label="Save" onClick={(e) => this.handleBidUpdate(e)} autoFocus />
                </div>
            );
        }
        else  return (
            <div>
                <Button label="Cancel" onClick={(e) => this.onHide(e,"bid")} className="p-button-text" />
                <Button label="Place Bid" onClick={(e) => this.saveReplyTweet(e)} autoFocus />
            </div>
        );
    }
    onHide(e,option) {
        if(option==="bid")
        this.setState({ showReplyTweet: false });
        else 
        this.setState({updateBid:false})
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

        if (layout === 'list')
            return this.renderListItem(tweet);

    }

    renderHeader() {
        return (
            <div className="center"><h4>Products</h4></div>
        );
    }
    handleUpdateCheck(e,p,u)
    {
        this.setState({updateBid:true,currentProductId:p, currentUser:u})
    }
    render() {
        const header = this.renderHeader();

        return (
            <div>
                <div className="dataview-demo">
                    <div className="card">
                        <DataView value={this.state.tweets} layout={this.state.layout} header={header}
                            itemTemplate={this.itemTemplate} paginator rows={3} />


                    </div>
                </div>

                <Dialog header="Enter Bid Amount" footer={this.renderFooter("bid")} 
                onHide={e=>this.onHide(e,"bid")}
                visible={this.state.showReplyTweet} style={{ width: '40vw' }}>

                    <br /><span>{this.state.message}</span><br />
                    <table className="table table-striped ">
                        {
                            this.state.replyTweets.map(
                                reply =>
                                    <tr key={reply.id}>
                                        <td>  {reply.loginId} </td>
                                        <td> {reply.replyMessage}</td>
                                        <td>
                                        {reply.loginId===localStorage.getItem('loginId')?
                                        <button onClick={e => this.handleUpdateCheck(e, reply.id, reply.loginId)}>Update</button>
                                        :null
                                        }</td>
                                        
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
            </div>
        );
    }
}

export default ViewTweetComponent