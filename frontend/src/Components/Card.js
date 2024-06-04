import React from 'react';
import "./Card.css"
import ApiLibrary from "../Library.js"


class Card extends React.Component
{

    
    async componentDidMount() {
        const apiLibrary = new ApiLibrary();
        const data = await apiLibrary.GetThumbData(100);
        console.log(data);

        this.setState(current => {return {vidName : data.vidName}});
        this.setState(current => {return {vidImg : data.vidImg}});
        this.setState(current => {return {chName : data.chName}});
        this.setState(current => {return {chImg : data.chImg}});
        this.setState(current => {return {views : data.views}});

        this.setState(current => {return {isLoading : false}});
    }


    state = 
    {
        size : [this.props.width, this.props.height],
        videoCode : this.props.videoCode,

        vidName : "---",
        vidImg : "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/helldivers-2-review.jpg",
        
        chName : "---",
        chImg : "https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg",

        views : "---",

        isLoading : true,
    }

    

    constructor(props)
    {
        super(props)
    }

    render()
    {
        const {videoCode, width, height} = this.props;

        if(this.state.isLoading === true)
        {
            return(
            <div className="Thumbnail">
    
                <div className = "ThumbnailImage"
                    style = {{
                       width : width - 20 + "px",
                       height : (width - 20) * 9 / 16+ "px",
                       backgroundColor : "darkslategray",
                    }}
                ></div>
    
                <div className = "ThumbnailContents">
    
                    <div className = "ChannelIcon"
                        style={{
                            backgroundColor : "darkslategray"
                        }}
                    ></div>
    
                    <div className = "ThumbnailDescript">
                        <p className = "ThumbnailTitle">{this.state.vidName}</p>
    
                        <p className = "ThumbnailDetail">{this.state.chName}{<br/>} views : {this.state.views}</p>
                    </div>
                    
                </div>
            </div>)
        }
        return(
        <div className="Thumbnail"
            onClick={()=>{window.location.replace(`${window.location.origin}/video/${this.props.videoCode}`)}}>

            <img className = "ThumbnailImage"
                style = {{
                   width : width - 20 + "px",
                   height : (width - 20) * 9 / 16 + "px",
                }}
                src = {`${window.location.origin}/vidImg/${this.state.vidImg}`}
            ></img>

            <div className = "ThumbnailContents">

                <img className = "ChannelIcon"
                src = {`${window.location.origin}/chImg/${this.state.chImg}`}
                ></img>

                <div className = "ThumbnailDescript">
                    <p className = "ThumbnailTitle">{this.state.vidName}</p>

                    <p className = "ThumbnailDetail">{this.state.chName}{<br/>} views : {this.state.views}</p>
                </div>
                
            </div>
        </div>)
    }
}

export default Card;