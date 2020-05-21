import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
            password: '',
            isLoggedIn: false
		};

	}

	 update = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	userLogin = (e) => {
		e.preventDefault();
		console.log('Logged in called');
		console.log(this.state);
        
if(this.state.email === '' || this.state.password === ''){
	alert("Fields cannot be blank");
	return;
}
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.status === 200) {
                this.setState({ isLoggedIn: true }, () => {
                    console.log("logged in",this.state);
                    this.props.history.push({
                        pathname: '/home',
                        state: { authenticated: this.state.isLoggedIn }
                      });
                  });
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
          });


        
       

          
        
	}

	render() {
		return (
			<div className="login">
				<form onSubmit={this.userLogin}>
					<h2>Login</h2>
					<div className="username">
						<input
							type="text"
							placeholder="Username..."
							value={this.state.email}
							onChange={this.update}
							name="email"
						/>
					</div>

					<div className="password">
						<input
							type="password"
							placeholder="Password..."
							value={this.state.password}
							onChange={this.update}
							name="password"
						/>
					</div>

					<input type="submit" value="Login" />
				</form>

				<Link to="/register">Create an account</Link>
			</div>
		);
	}
}

export default Login;