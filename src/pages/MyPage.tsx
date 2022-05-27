import { setHeader } from "../api";
import { Header } from "../components";

const MyPage = () => {

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }

    return (
        <>
        <Header />
        <div>MyPage</div>
        </>
    );
};

export default MyPage;
