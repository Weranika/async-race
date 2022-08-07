const server = 'http://127.0.0.1:3000';

const garage = `${server}/garage`;

export const GetCars = async (page:number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  //  const data = await response.json();
  return {
    data: await response.json(),
    carsCount: response.headers.get('X-Total-Count'),
  }
}

