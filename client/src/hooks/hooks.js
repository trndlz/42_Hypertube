import { useState, useEffect } from 'react';

// const usePost = async (body, url) => {
//     // let isLoading = true;
//     let res = await fetch(url, {
//         headers: {
//             "Content-Type": "application/json"
//         },
//         method: "POST",
//         body: body
//     });
//     setEmailVerified(true);
//     res = await res.json();
//     // isLoading = false;
//     setEmailError(res.error)
// }


//==============================================

export const useHttpPostFormData = (url, body, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    console.log('Sending Http request to URL: ' + url);
    fetch(url, {
            // headers: {
            //     "Content-Type": "application/json"
            // },
            method: "POST",
            body: body
        })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        setFetchedData(data);
        console.log("DATA FETCHED");
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading, fetchedData];
};