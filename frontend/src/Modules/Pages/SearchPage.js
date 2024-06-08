import React from 'react';

import { ApiLibrary } from '../../Library';
import { useParams } from 'react-router-dom';
import { serverRoot } from '../../App.js'
import Card from '../../Components/Card.js';
import "./NotfoundPage.css"
import "./SearchPage.css"


function withParams(Component)
{
    return (props) => <Component{...props} params={useParams()}/>;
}


class SearchPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            ...this.state,
            keyword: props.params.keyword
        };

        const handleResize = () => {
            this.setState(
                current => {return {windowSize : [window.innerWidth, window.innerHeight]}} 
            )
        }
        window.addEventListener("resize", handleResize);
    }
   
    state = {
        keyword : "",
        windowSize : [window.innerWidth, window.innerHeight],
        videoCodeList : [],
    };

    componentDidMount()
    {
        const aLib = new ApiLibrary();
        aLib.GetSearchVideos(this.state.keyword).then(e=>{

            const list = e.videoCodes;
            this.setState(cur=>{return{videoCodeList : list}})
        })
    }

	render() 
	{
        const margin = 30
        const sizeMin = 300
        const columnCount =  Math.floor(window.innerWidth/sizeMin);
        const thumbWidth = ((window.innerWidth - margin * 2) / columnCount);
        const thumbHeight = Math.floor(thumbWidth * 0.8);

		return (<div className='SearchPage'
            >
            <div className='SearchAnnounce'>
                <i>Results of Search by "{this.state.keyword}"</i>
            </div>
            <div className="VideoGrid"
                style = {{
                    gridTemplateColumns : "repeat(" + columnCount +", " + thumbWidth + "px)",
                    gridTemplateRows : "repeat(" + 10  +", " + thumbHeight +"px)",
                }}>
            {this.state.videoCodeList.map(item => 
                <Card videoCode = {item} width = {thumbWidth} height = {thumbHeight}></Card>
            )}
            </div>
            </div>
        )
    }

}


export default withParams(SearchPage)