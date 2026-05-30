const getToken = () => localStorage.getItem("token");

const getHeaders = (includeJson = true) => {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (includeJson) headers["Content-Type"] = "application/json";
  return headers;
};

const handleResponse = async (res) => {
  const text = await res.text();
  if (!text) {
    if (!res.ok) throw new Error("Empty server response");
    return null;
  }
  let body;
  try {
    body = JSON.parse(text);
  } catch (err) {
    throw new Error("Invalid JSON response from server");
  }
  if (!res.ok) {
    const error = new Error(body.message || "API error");
    error.status = res.status;
    error.errors = body.errors || null;
    throw error;
  }
  return body.data;
};

export const apiGet = (url) => fetch(url, { headers: getHeaders(false) }).then(handleResponse);
export const apiPost = (url, payload) => fetch(url, { method: "POST", headers: getHeaders(), body: JSON.stringify(payload) }).then(handleResponse);
export const apiPatch = (url, payload) => fetch(url, { method: "PATCH", headers: getHeaders(), body: JSON.stringify(payload) }).then(handleResponse);
export const apiDelete = (url, payload) => fetch(url, { method: "DELETE", headers: getHeaders(), body: payload ? JSON.stringify(payload) : undefined }).then(handleResponse);
