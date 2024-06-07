import React from 'react';
import "./NotfoundPage.css"

class ProfilePage extends React.Component
{
    render(){
    
        return (<div className='NotfoundPage'>
            <div onClick={()=>{window.location.replace(`${window.location.origin}/`)}}>
                <i className="Announce">Page NotFounded!</i>
                <br/>
                <i className="ReturnLink"
                    >Please click here to go back to home!</i>
            </div>
        </div>)
    }
}

export default ProfilePage