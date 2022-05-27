import { setHeader } from "../api";
import { Header } from "../components";

const NotFound = () => {

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }


    return (
        <>
        <Header />
        <div>not found page</div>
        </>
    );
};

export default NotFound;
