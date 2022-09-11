const requestAPI = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const json = await response.json();
  const array = Object.keys(json);
  const result = array.filter((item) => item !== 'USDT');
  return result;
};

export default requestAPI;
