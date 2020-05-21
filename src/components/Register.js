import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			fullname: '',
			email: '',
			password: '',
			confirmPass:''
		};

	
	}
	 
	
	
	update = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	registerUser = (e) => {
		e.preventDefault();
		console.log('Registe Function called.');
		console.log(this.state);
	     if(this.state.password !== this.state.confirmPass){
			 console.log('Password do not matched');
			 alert("Confirm password fo not matched");
			 return;
		 }
        
        
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.status === 200) {
			 alert("user registered")
			 this.setState({
				fullname: '',
				email: '',
				password: '',
				confirmPass:''
			 });
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            alert('Error Registering in please try again');
          });
	}

	render() {
		return (
			<div className="register">
				<form onSubmit={this.registerUser}>
					<h2>Register</h2>

					<div className="name">
						<input
							type="text"
							placeholder="Full Name"
							name="fullname"
							value={this.state.fullname}
							onChange={this.update}
						/>
					</div>

					<div className="email">
						<input
							type="text"
							placeholder="Enter your email"
							name="email"
							value={this.state.email}
							onChange={this.update}
						/>
					</div>

					<div className="pasword">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={this.state.password}
							onChange={this.update}
						/>
					</div>
					<div className="email">
						<input
							type="password"
							placeholder="Confirm Password"
							name="confirmPass"
							value={this.state.confirmPass}
							onChange={this.update}
						/>
					</div>
					

					<input type="submit" value="Submit" />
				</form>

				<Link to="/">Login Here</Link>
			</div>
		);
	}
}

export default Register;