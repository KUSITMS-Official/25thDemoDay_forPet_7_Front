import axios from "axios";

const postApi = async (data: any, end_url: string) => {
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjUzMDYwODc5LCJleHAiOjE2NTMwNjI2Nzl9.eDZRLO522Q0zIL9CUQahcWsjNiLXYizgu_60M00yWeo'

    const config = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            // "Authorization": ''
        },
    };
    // config.headers["Authorization"] = `Bearer ${token}`;

    return await axios.post(
        process.env.REACT_APP_BACK_BASE_URL + end_url,
        data,
        config
    );
};

export default postApi;
