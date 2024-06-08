import React from 'react';
import { ApiLibrary, CookieLibrary } from '../../Library';
import { useParams } from 'react-router-dom';
import { serverRoot } from '../../App.js'
import Card from '../../Components/Card.js';
import "./ChannelPage.css"



function withParams(Component)
{
    return (props) => <Component{...props} params={useParams()}/>;
}


class ChannelPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            ...this.state,
            channelId: props.params.id
        };

        const handleResize = () => {
            this.setState(
                current => {return {windowSize : [window.innerWidth, window.innerHeight]}} 
            )
        }
        window.addEventListener("resize", handleResize);
        

        const cLib = new CookieLibrary()
        const userId = cLib.GetCookieUserId();
        this.setState(current => {return {userId : userId}} )
        
    }
    state = {
        userId : null,
        channelId : "",
        windowSize : [window.innerWidth, window.innerHeight],
        videoCodeList : [],

        channelName : "",
        channelImg : null,
    };

    componentDidMount()
    {
        const aLib = new ApiLibrary();

        aLib.GetProfileBasic(this.state.channelId).then(e=>{

            const img = e.userImg;
            const name = e.userName;
            this.setState(cur=>{return{userImg : img}})
            this.setState(cur=>{return{channelName : name}})
        })

        aLib.GetChannelVideos(this.state.channelId).then(e=>{

            const list = e.videoCodes;
            this.setState(cur=>{return{videoCodeList : list}})
        })
    }

    render(){
    
        const margin = 30
        const sizeMin = 300
        const columnCount =  Math.floor(window.innerWidth/sizeMin);
        const thumbWidth = ((window.innerWidth - margin * 2) / columnCount);
        const thumbHeight = Math.floor(thumbWidth * 0.8);

		return (<div className='SearchPage'
            >
            <div className='ChannelProfile'>
                <div className='ProfileContainer'>
                    <img className='ProfileImage'
                        src = {this.state.channelImg == null?
                            "https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg": 
                            `${serverRoot}/api/chImg/${this.state.channelImg}`}></img>
                    <div className='ProfileContainer'>
                        <p className='ProfileName'>{this.state.channelName}</p>
                    </div>
                    (this.state.userId == this.state.channelId? <div>
                        
                    </div>:<div/>)
                </div>
            </div>
            <br/>
            <div className='SearchAnnounce'>
                <i style={{margin : "10px"}}>Videos of this channel...</i>
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

export default withParams(ChannelPage)