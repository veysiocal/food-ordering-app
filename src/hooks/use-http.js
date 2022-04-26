import { useCallback, useEffect, useRef, useState } from "react";

export const useHttp = () => {
    const [haveError, setHaveError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', headers = {}, body = null) => {
        setIsLoading(true);

        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortCtrl.signal
            });
            setIsLoading(false);

            const data = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(ctrl => ctrl !== httpAbortCtrl);
            //This keeps every controller except for the controller which was used in this request.
            // our request is completed, so we removed it.

            if (!response.ok) { // if response's status is 200's
                throw new Error(data.message);
            }

            return data;
        }
        catch (err) {
            setIsLoading(false);
            setHaveError(err.message);
        }
    }, []);

    const clearError = useCallback(() => {
        setHaveError(null);
    }, []);

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, [])

    return [isLoading, haveError, sendRequest, clearError];
};
