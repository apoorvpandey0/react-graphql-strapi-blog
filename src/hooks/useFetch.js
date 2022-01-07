import { useEffect,useState } from "react";
const useFetch = (url, options) => {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, options);
                const json = await response.json();
                setData(json['data']);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    },[]);
    return { data, error, loading };
}
export default useFetch;