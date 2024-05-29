import React from 'react';
import "./Card.css"

class Card extends React.Component
{
    state = 
    {
        size : [0,0],
        width : 0,
        height : 0,
        videoCode : "",
        image : "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/helldivers-2-review.jpg",
        name : "hello"
    }

    constructor(props)
    {
        super(props)
        this.setState({size : [props.width, props.height]})
        console.log(props.width);
        this.setState({width : props.width})
        this.setState({height : props.height})
        this.setState(current => ({videoCode : props.videoCode}))
    }


    render()
    {
        console.log(this.state.size);
        console.log(this.state.width);
        console.log(this.state.height);
        return(<div className="items">
            <img className = "Thumbnail"
                style = {{
                    maxWidth : "44mm"
                   //maxWidth : this.state.size[0] + "mm",
                   // maxHeight : this.state.size[1]
                }}
                src = {this.state.image}
            ></img>
            {this.state.name}
        </div>)
    }


}

export default Card;