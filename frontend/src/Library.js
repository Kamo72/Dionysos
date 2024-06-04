


class ApiLibrary{

    GetThumbData = async (videoCode) => {
        
        let json = await (
            await fetch(`http://localhost:8080/api/video/thumb/${videoCode}`)
            // await fetch(`${window.location.origin}/api/video/thumb/${videoCode}`)
        ).json();

        return json
    };
}


export default ApiLibrary;