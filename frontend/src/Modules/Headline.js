import React from 'react';
import "./Headline.css"
import Searcher from '../Components/Searcher';
import testIcon from '../Resources/magnifier.png'

class Headline extends React.Component 
{
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
				<i className="Logo">Dionysos</i>
				<Searcher></Searcher>
			</div>
			<div className="SideIcon">
				<p>hello!</p>
			</div>
		</header>);
	}
}

export default Headline;