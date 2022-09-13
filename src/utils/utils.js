const BASE_URL = 'https://api.methanoy.nomoredomains.sbs';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(
    `Okay, Houston, we've had a problem here: ${res.status}`,
  );
};

export { BASE_URL, handleResponse };
