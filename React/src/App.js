import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Registration from './Component/Registration';
import LoginComponent from './Component/LoginComponent';
import HomeComponent from './Component/HomeComponent';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ViewTweetComponent from './TweetComponent/ViewTweetComponent';
import ForgetPasswordComponent from './ChangePasswordComponent/ForgetPasswordComponent';
import ForgetPasswordSuccessComponent from './ChangePasswordComponent/ForgetPasswordSuccessComponent';
import ProductInformation from './Component/ProductInformation';



function App() {
  return (
    <BrowserRouter>
    <div className="Container">
       <Switch> 
      <Route path = "/registration" exact component = {Registration}></Route>
      <Route path = "/" exact component = {LoginComponent}></Route>
      <Route path = "/home" exact component = {HomeComponent}></Route>
      <Route path = "/product/:id" exact component = {ProductInformation}></Route>
      <Route path = "/view" exact component = {ViewTweetComponent}></Route>
      <Route path = "/forgetPassword" exact component = {ForgetPasswordComponent}></Route>
      <Route path = "/forgetPasswordSuccess" exact component = {ForgetPasswordSuccessComponent}></Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
