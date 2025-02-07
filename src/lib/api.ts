import { queryOptions } from '@tanstack/react-query';
import axios from 'axios'

async function fetchMe() {
    const res = await axios.get('/api/me');
    if(!res.ok){
        throw new Error("server error");
    }
    const data = await res.json();
    return data
}

export const userQueryOptions = queryOptions({queryKey: ['get-profile'], queryFn: fetchMe, staleTime: Infinity})
