import axios from "axios";

async function get(url, config) {
  try {
    const response = await axios.get(url, config);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function post(url, data, config) {
  try {
    const response = await axios.post(url, data, config);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function put(url, data, config) {
  try {
    const response = await axios.put(url, data, config)
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function patch(url, params: any) {
  try {
    const response = await axios.patch(url, data, config);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteMethod(url, config) {
  try {
    const response = await axios.delete(url, config);
  } catch (e) {
    throw new Error(e);
  }
}

export { get, post, put, patch, deleteMethod };