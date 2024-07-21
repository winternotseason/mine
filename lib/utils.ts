/* const user = await fetcher(`${process.env.NEXT_PUBLIC_APP_URL}/api/register`, {
      method: "POST",
      body: JSON.stringify(data)
    }) 
    
    fetcher에서 url = 환경변수 URL
    options = method, body....
    */

export const fetcher = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  try {
    return await response.json();
  } catch (error) {
    return null;
  }
};
