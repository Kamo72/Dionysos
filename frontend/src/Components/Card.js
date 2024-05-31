import React from 'react';
import "./Card.css"

import { BrowserRouter as Link } from 'react-router-dom';

class Card extends React.Component
{
    state = 
    {
        size : [this.props.width, this.props.height],
        videoCode : this.props.videoCode,
        thumbImg : "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/helldivers-2-review.jpg",
        channelImg : "https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg",
        name : "asdsasdasdsadsadssssssssssssssssssssssssasdasdasdsassssadsada"


    }


    constructor(props)
    {
        super(props)
    }

    render()
    {
        const {videoCode, width, height} = this.props;

        return(
        <a className="Thumbnail"
            href = {videoCode}>

            <img className = "ThumbnailImage"
                style = {{
                   maxWidth : width - 20 + "px",
                   maxHeight : height + "px",
                   
                }}
                src = {this.state.thumbImg}
            ></img>

            <div className = "ThumbnailContents">

                <img className = "ChannelIcon"
                    src = {this.state.channelImg}
                ></img>

                <div className = "ThumbnailDescript">
                    <p className = "ThumbnailTitle">{this.state.name}</p>

                    <p className = "ThumbnailDetail">{"헬다이버즈2"}{<br/>} views : {0}</p>
                </div>
                
            </div>
        </a>)
    }
}

export default Card;