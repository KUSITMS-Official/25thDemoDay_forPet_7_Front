import axios from "axios";

interface CommonHeaderProperties {
    "Authorization": string | null;
}

const setHeader = (token: string | null) => {
    (
        axios.defaults.headers! as unknown as Record<string, CommonHeaderProperties>
    ).common["Authorization"] = `Bearer ${token}`;
}

export default setHeader