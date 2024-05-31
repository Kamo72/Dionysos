import React from 'react';
import "./Headline.css"
import Searcher from '../Components/Searcher';

class Headline extends React.Component 
{
	render() 
	{
		return (<header className='Headline'>
            <i className="Logo">Dionysos</i>
            <Searcher></Searcher>
		</header>);
	}
}

export default Headline;