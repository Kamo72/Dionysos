
import { serverRoot } from "./App";


export class ApiLibrary{

    GetThumbData = async (videoCode) => {
        
        let json = await (
            await fetch(`${serverRoot}/api/video/thumb/${videoCode}`)
            // await fetch(`${window.location.origin}/api/video/thumb/${videoCode}`)
        ).json();

        return json
    };
    GetViewData = async (videoCode) => {
        console.log("requesting GetViewData as " + videoCode);
        let json = await (
            await fetch(`${serverRoot}/api/video/view/${videoCode}`)
            // await fetch(`${window.location.origin}/api/video/thumb/${videoCode}`)
        ).json();

        return json
    };


    GetProfileBasic = async (userCode) => {
        console.log("requesting GetProfileBasic as " + userCode);
        let json = await (
            await fetch(`${serverRoot}/api/channel/basic/${userCode}`)
            // await fetch(`${window.location.origin}/api/video/thumb/${videoCode}`)
        ).json();

        return json
    };

    

    GetSearchVideos = async (keyword) => {
        console.log("requesting GetSearchData as " + keyword);
        let json = await (
            await fetch(`${serverRoot}/api/video/search/${keyword}`)
            // await fetch(`${window.location.origin}/api/video/thumb/${videoCode}`)
        ).json();

        return json
    };
    GetChannelVideos = async (keyword) => {
        console.log("requesting GetChannelVideos as " + keyword);
        let json = await (
            await fetch(`${serverRoot}/api/video/channel/${keyword}`)
            // await fetch(`${window.location.origin}/api/video/thumb/${videoCode}`)
        ).json();

        return json
    };
    GetRandomVideos = async () => {
        console.log("requesting GetRandomVideos");
        let json = await (
            await fetch(`${serverRoot}/api/video/random`)
            // await fetch(`${window.location.origin}/api/video/thumb/${videoCode}`)
        ).json();

        return json
    };
}



export class CookieLibrary{

    GetCookieUserId = ()=>
    {
        return this.GetCookieValue("userId");
    }

    GetCookieValue = (name) => {
        // document.cookie 문자열에서 각 쿠키를 세미콜론으로 분리
        const cookies = document.cookie.split(';');
        
        // 각 쿠키를 순회하며 원하는 쿠키를 찾음
        for (let cookie of cookies) {
            // 쿠키 앞뒤의 공백을 제거
            cookie = cookie.trim();
            
            // 쿠키 이름과 값으로 분리
            const [cookieName, cookieValue] = cookie.split('=');
            
            // 원하는 쿠키 이름과 일치하면 값을 반환
            if (cookieName.trim() === name) {
                return decodeURIComponent(cookieValue); // 쿠키 값 디코딩 후 반환
            }
        }
        
        // 원하는 쿠키를 찾지 못했을 경우 null 반환
        return null;
    }
    
    GetAllCookies = () => {
        const cookies = document.cookie.split(';');
        const cookieMap = {};
    
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            cookieMap[name] = decodeURIComponent(value);
        }
    
        return cookieMap;
    }
}