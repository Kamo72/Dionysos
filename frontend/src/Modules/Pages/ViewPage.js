import React from 'react';
import {ApiLibrary} from '../../Library';
import './ViewPage.css'
import { useParams } from 'react-router-dom';
import { serverRoot } from '../../App.js'

function withParams(Component)
{
    return (props) => <Component{...props} params={useParams()}/>;
}

class ViewPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            ...this.state,
            videoCode: props.params.id
        };

        const handleResize = () => {
            this.setState(
                current => {return {windowSize : [window.innerWidth, window.innerHeight]}} 
            )
        }
        window.addEventListener("resize", handleResize);
        
    }

    async componentDidMount() {
        const apiLibrary = new ApiLibrary();
        const data = await apiLibrary.GetViewData(this.state.videoCode);

        this.setState(current => {return {vidName : data.vidName}});
        this.setState(current => {return {vidImg : data.vidImg}});
        this.setState(current => {return {chName : data.chName}});
        this.setState(current => {return {chImg : data.chImg}});
        this.setState(current => {return {views : data.views}});

        this.setState(current => {return {vidFile : data.vidFile}});
        this.setState(current => {return {chSubs : data.chSubs}});

        this.setState(current => {return {isLoading : false}});
    }

    state = 
    {
        windowSize : [window.innerWidth, window.innerHeight],
        videoCode : null,

        vidName : "---",
        vidImg : "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/helldivers-2-review.jpg",
        chName : "---",
        chImg : "https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg",
        views : "---",

        vidFile : null,
        chSubs : 0,

        isLoading : true,
    }

    render()
    {
        let [boxWidth, boxHeight] = this.state.windowSize

        boxHeight -= 100 + 22

        if(boxWidth > boxHeight * 16 / 9)
            boxWidth = boxHeight * 16 / 9
        else
            boxHeight = boxWidth / 16 * 9

        return(<div className='ViewPage'>
            <div className='VideoZone'
                style={{
                    width : window.innerWidth,
                    height : boxHeight,
                }}>
                <video className='Video' controls autoPlay
                    poster={`${serverRoot}/api/vidImg/${this.state.vidImg}`}
                    src={`${serverRoot}/api/vidFile/${this.state.vidFile}`}
                    style={{
                        zIndex : 10,
                        width : boxWidth,
                        height : boxHeight,
                        marginLeft : (window.innerWidth-boxWidth) / 2.0
                    }}
                    >
                </video>
            </div>
            <p className = "Title">{this.state.vidName}</p>
            <div className='Channel'>
                <img className = "ChannelIcon"
                    style={{
                        backgroundColor : "darkslategray"
                    }}
                    src={`${serverRoot}/api/chImg/${this.state.chImg}`}
                ></img>

                <div className = "ChannelDescripts">
                    <p className = "ChannelName">{this.state.chName}</p>
                    <p className = "ChannelSubs">Subs : {this.state.chSubs}</p>
                </div>
                <p className = "ChannelSubs">views : {this.state.views}</p>
                    
            </div>

        </div>)

    }
}

export default withParams(ViewPage);