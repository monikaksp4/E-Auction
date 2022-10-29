import axios from 'axios';
const baseUrl = 'http://localhost:8081/e-auction/api/v1';
//const loginId=localStorage.getItem('loginId');
class PostService {

	postTweet(product) {
		let loginId = localStorage.getItem('loginId');
		return axios.post(baseUrl + '/seller/' + loginId + '/add-product', product);
	}
	saveLike(username, id) {
		return axios.put(baseUrl + '/' + username + '/like/' + id);
	}
	getAllTweet() {
		return axios.get(baseUrl + '/all');
	}
	showBids(id) {
		return axios.get(`${baseUrl}/seller/show-bids/${id}`)
	}
	getReplyTweet(tweetMessageId) {
		return axios.get(`${baseUrl}/buyer/show-bid/${tweetMessageId}`);
	}
	saveReplyTweet(reply) {
		return axios.post(`${baseUrl}/buyer/place-bid`, reply);
	}
	updateBidAmount(id, newBidAmount, username) {
		return axios.put(`${baseUrl}/buyer/update-bid/${id}/${username}/${newBidAmount}`)
	}
	getUserTweet() {
		let loginId = localStorage.getItem('loginId');
		return axios.get(baseUrl + '/' + loginId);

	}
	getProductDetails(id) {
		let loginId = localStorage.getItem('loginId');
		return axios.get(baseUrl + '/seller/' + loginId + '/product/' + id);
	}
	updateTweet(tweet, id) {
		let loginId = localStorage.getItem('loginId');
		return axios.put(`${baseUrl}/seller/${loginId}/update/${id}`, tweet);
	}
	resetPassword(oldPassword, newPassword) {
		let loginId = localStorage.getItem('loginId');
		return axios.put(baseUrl + '/' + loginId + '/resetPassword/' + oldPassword + '/' + newPassword);
	}
	deleteProduct(id) {
		let loginId = localStorage.getItem('loginId');
		return axios.delete(baseUrl + '/seller/' + loginId + '/delete/' + id);
	}
}
export default new PostService