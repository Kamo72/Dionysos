import React from 'react';
import "./Headline.css"
import Searcher from '../Components/Searcher';
import testIcon from '../Resources/magnifier.png'

class Headline extends React.Component 
{

	state={
		isHighlightSignin : false,
	}

	render() 
	{
		return (<header className='Headline'>
			<div className="SideIcon"
					style={{
						height: "10%",
					}}>
				<img 
					style={{
						height: "50px",
						filter: "invert()",
					}}	
					src = {testIcon}
					onClick={()=>{this.props.toggleFunc()}}></img>
			</div>
			<div>
				<i className="Logo"
					onClick={()=>{window.location.replace(`${window.location.origin}/`)}}
					>Dionysos</i>
				<Searcher></Searcher>
			</div>
			<div className="AccountDiv">
                <p 
                    onMouseEnter={()=>{this.setState(current => {return { isHighlightSignin : true}} )}}
                    onMouseLeave={()=>{this.setState(current => {return { isHighlightSignin : false}} )}}
                    onClick={()=>{
                        window.location.replace(`${window.location.origin}/signin`)
                    }}
                    style={{
                        color: this.state.isHighlightSignin? "lightblue":"white",
						marginRight : "20px",
						fontSize : "20px",
                    }}>
                	<b>SIGNIN</b>
				</p>
			</div>
		</header>);
	}
}

export default Headline;