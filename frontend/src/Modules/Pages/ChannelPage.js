import React from 'react';
import { ApiLibrary, CookieLibrary } from '../../Library';
import { useParams } from 'react-router-dom';
import { serverRoot } from '../../App.js'
import Card from '../../Components/Card.js';
import "./ChannelPage.css"
import { ImageInterface } from './UploadPage.js';



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
        
    }

    PostChImage= async () =>
    {
        const postData = {
            channelId : this.state.channelId,
            imageUpload : this.state.imageUpload,
        }

        const response = await(
            //요청
            await fetch(serverRoot + "/api/signup", {
                method: "POST", // 또는 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            })
        );

        response.json().then(error => {
            console.log(error.message); // 서버에서 전달한 오류 메시지를 throw
            alert(error.message);
        });

        if(response.status == 200)
        {
            alert("채널 이미지 재설정에 성공했습니다.");
            window.location.replace(`${window.location.origin}/channel/${this.userId}`)
        }
    }

    state = {
        userId : null,
        channelId : "",
        windowSize : [window.innerWidth, window.innerHeight],
        videoCodeList : [],

        channelName : "",
        channelImg : null,
        imageUpload : null,
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

        
        const cLib = new CookieLibrary()
        const userId = cLib.GetCookieUserId();
        this.setState(current => {return {userId : userId}} )
    }

    render(){
    
        const margin = 30
        const sizeMin = 300
        const columnCount =  Math.floor(window.innerWidth/sizeMin);
        const thumbWidth = ((window.innerWidth - margin * 2) / columnCount);
        const thumbHeight = Math.floor(thumbWidth * 0.8);

        console.log(this.state.userId + " ... " + this.state.channelId)
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
                    {this.state.userId == this.state.channelId? <div 
                        style={{
                            width : "500px",
                            display : "flex",
                            alignItems : "center",
                        }}>
                        <ImageInterface
                            updater = {v => this.setState(cur=>{return {imageUpload : v}})}
                            getter = {()=> {return this.state.imageUpload}}
                        ></ImageInterface>
                        <button className = "ConfirmButton"
                            style={{
                                width : "200px",
                            }}
                        >채널 이미지 설정</button>
                    </div>:<div/>}
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