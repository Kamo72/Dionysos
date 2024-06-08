import React from 'react';
import "./Footer.css"

class Footer extends React.Component 
{
	state={
		
        isHighlight : false,
	}
	render() 
	{
		return (<footer className='Footer'>
			<div style={{
					alignItems : "center",
					textAlign : "center"
				}}
				onClick={()=> {  window.location.replace('https://github.com/Kamo72') }}
				onMouseEnter={()=>{this.setState(current => {return { isHighlight : true}} )}}
				onMouseLeave={()=>{this.setState(current => {return { isHighlight : false}} )}}>
				<p className="Announce"
					style={{fontSize : "30px"}}
				>This Web is Maden by Kamo72</p>
				<p className="ReturnLink"
					style={{fontSize : "20px"}}>Click here to Visit my github.com!</p>
			</div>
            </footer>);
	}
}

export default Footer;