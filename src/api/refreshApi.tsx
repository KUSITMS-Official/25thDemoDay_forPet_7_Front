import { AxiosRequestConfig } from "axios";
import Cookie from "js-cookie"
import moment from "moment";
import { getApi, setHeader } from "../api"

const refreshApi = async () => {
    //const refreshToken = Cookie.get('refresh_token');       //쿠키에 저장되어있는 refreshToken을 가져옴
    const expireAt: string | null = localStorage.getItem('expireAt');      //accessToken 만료시간을 체크하는 expireAt값을 가져옴
                                                                            //TODO: 로그인/회원가입시 expireAt set해주는 코드 추가
    let token: string | null = localStorage.getItem('token');              //로컬에 저장해둔 accessToken을 가져옴

    //토큰이 만료되었을 때(accessToken 유지시간 체크)
    if(moment(expireAt).diff(moment()) < 0) {
        const {data} = await getApi( {}, `/auth/refresh` );

        token = data.body.token;
        localStorage.setItem('token', data.body.token);
        localStorage.setItem('expireAt', moment().add(1, 'm').format('yyyy-MM-DD HH:mm:ss'));
    }

    setHeader(token);
};

export { refreshApi };