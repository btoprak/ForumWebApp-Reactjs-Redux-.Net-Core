import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import { authCheckState } from './redux/actions/authActions';
import Navi from './components/Navi/Navi';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import Topics from './components/Forum/Topic/Topics';
import Forum from './components/Forum/Forum';
import CreateTopic from './components/Forum/Topic/CreateTopic';
import Post from './components/Post/Post';
import CreateReply from './components/Post/CreateReply/CreateReply';
import UserDetail from './components/User/UserDetail/UserDetail';
import CreateForum from './components/Forum/CreateForum';
import UsersWithRoles from './components/Admin/UsersWithRoles';
import SearchPostResult from './components/Post/SearchPost/SearchPostResult';
import Footer from './components/Footer/Footer';

class App extends Component {

  componentDidMount() {
    this.props.authCheckState();
  }

  render() {

    return (
      <div>
        <Navi user={this.props.authUser} isAuth={this.props.isAuthenticated}></Navi>
        <Container>
          {
            this.props.isAuthenticated ?
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/forum" exact component={Forum} />
                <Route path="/forum/:forumId" component={Topics} />
                <Route path="/post/:postId" exact component={Post} />
                <Route path="/searchpostresult" component={SearchPostResult} />
                <Route path="/createtopic/:forumId" component={CreateTopic} />
                <Route path="/createreply/:postId" component={CreateReply} />
                <Route path="/profile/:userId" component={UserDetail} />
                <Route path="/logout" component={Logout} />
                {this.props.authUser.roleNames.some(role => role === "Admin") ?
                  <Switch>
                    <Route path="/createforum" component={CreateForum} />
                    <Route path="/userswithroles" component={UsersWithRoles} />
                  </Switch>
                  : ""}
              </Switch> :
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/forum" exact component={Forum} />
                <Route path="/forum/:forumId" component={Topics} />
                <Route path="/post/:postId" exact component={Post} />
                <Route path="/searchpost" component={SearchPostResult} />
                <Route path="/profile/:userId" component={UserDetail} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/register" component={Register} />
              </Switch>
          }
        </Container>

        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    authUser: state.authReducer.user
  };
};


// const mapDispatchToProps = dispatch => {
//   return {
//     actions: {
//       authCheckState: bindActionCreators(authActions.authCheckState, dispatch),
//     }
//   };
// };

export default connect(mapStateToProps, { authCheckState })(App);
