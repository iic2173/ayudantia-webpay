async function handleFetch({ route, method, headers = {}, body = null }) {
  const url = new URL(route, import.meta.env.VITE_API_URL);
  if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
    const response = await fetch(url, {
      method,
      headers: {
        ...headers,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  const response = await fetch(url, {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export { handleFetch };
