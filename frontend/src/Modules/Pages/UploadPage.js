import React from 'react';
import "./NotfoundPage.css"
import { serverRoot, webRoot } from '../../App';
import "./UploadPage.css"
import { CookieLibrary } from '../../Library';
class UploadPage extends React.Component
{
    UploadFile = () => 
    {
        const formData = new FormData();
        const cLib = new CookieLibrary();

        formData.append('video', this.state.file);
        formData.append('image', this.state.image);
        formData.append('name', this.state.name);
        formData.append('memberId', cLib.GetCookieUserId());

        fetch(`${serverRoot}/api/video/upload`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('영상 업로드에 성공했습니다.')
                window.location.replace(`${webRoot}/channel/${cLib.GetCookieUserId()}`)
            } else {
                alert('response : ' + response.status)
            }
        })
        .catch(error => {
            alert('Error:', error);
        });
    }

    state = 
    {
        isFocusedButton : false,
        isHighlightButton : false,
        file : null,
        image : null,
        name : null,
    }

    render(){
        return (<div className='NotfoundPage'>
            <div>
                <i className="Announce">Upload your video!</i>
                <br/>
                <i className="ReturnLink"
                    >simple, easy, comfortable.</i>
            </div>

            <VideoInterface
                updater = {v => this.setState(cur=>{return {file : v}})}
                getter = {()=> {return this.state.file}}
            ></VideoInterface>
            <ImageInterface
                updater = {v => this.setState(cur=>{return {image : v}})}
                getter = {()=> {return this.state.image}}
            ></ImageInterface>

            <br/>
            <div className='InputLine'>
                <p className='InputName'>Name of Video</p>
                <input className='InputBox'
                    type="text"
                    placeholder="Insert your video's name"
                    onChange={e => this.setState(()=>{return {name : e.target.value}})}
                ></input>
            </div>

            <br/>
            <button className="ConfirmButton" 
                onFocus={()=>{this.setState(current => {return { isFocusedButton : true}} )}}
                onBlur={()=>{this.setState(current => {return { isFocusedButton : false}} )}}
                onMouseEnter={()=>{this.setState(current => {return { isHighlightButton : true}} )}}
                onMouseLeave={()=>{this.setState(current => {return { isHighlightButton : false}} )}}

                style={{
                    outlineColor : this.state.isFocusedButton? "#006eff" : "#34343f",
                    backgroundColor : this.state.isHighlightButton? "#94949f" : "#34343f",
                }}
                type="button" onClick={()=>this.UploadFile()}>Upload File</button>
            <br/>
            <br/>
            <br/>
        </div>)
    }

}

class VideoInterface extends React.Component
{
    GetSrc = () => {
        if(this.props.getter() == null) return null;

        const url = URL.createObjectURL(this.props.getter());
        console.log(url)

        return url;
    }

    render()
    {
        return(
        <form className="DivFile" encType="multipart/form-data">
            {this.props.getter() == null? (
                <img className="UploadThumb"
                    src="https://static.vecteezy.com/system/resources/previews/005/073/059/original/empty-box-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg">
                </img>
            ) : (
                <video className="UploadThumb" src={ this.GetSrc() }></video>
            )}
            <input className="InputFile" type="file" name="fileInput" id="fileInput" accept=".mp4"
                style={{
                    width : "25%",
                    margin : 0,
                }}
                onChange={e => this.props.updater( e.target.files[0])    
                }></input>
        </form>)
    }
}

export class ImageInterface extends React.Component
{
    GetSrc = () => {
        if(this.props.getter() == null) return null;

        const url = URL.createObjectURL(this.props.getter());
        console.log(url)

        return url;
    }

    render()
    {
        return(
        <form className="DivFile" encType="multipart/form-data">
            <img className="UploadThumb"
                src={this.props.getter() == null?
                    "https://static.vecteezy.com/system/resources/previews/005/073/059/original/empty-box-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg"
                    : this.GetSrc()}>
            </img>
            
            <input className="InputFile" type="file" name="fileInput" id="fileInput" accept=".png, .jpg"
                style={{
                    width : "25%",
                    margin : 0,
                }}
                onChange={e => this.props.updater( e.target.files[0])    
                }></input>
        </form>)
    }
}



export default UploadPage