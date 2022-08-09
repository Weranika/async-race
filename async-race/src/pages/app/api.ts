const server = 'http://127.0.0.1:3000';

const garage = `${server}/garage`;

export const GetCars = async (page:number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    data: await response.json(),
    carsCount: response.headers.get('X-Total-Count'),
  }
}

export const createCar = async (name:string, color:string) => {
  const response = await fetch(`${garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
      body: JSON.stringify({
        name: name,
        color: color
    })
  });
  if (response.ok) {
    return await response.json();
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

export const deleteCar = async (id:string) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) { 
      console.log(`car ${id} deleted`);
    }
    else {
      console.log("HTTP request unsuccessful")
    }
  })
}

export const getCar = async (id:string) => {
  const response = await fetch(`${garage}/${id}`);
  return {
    data: await response.json(),
  }
}

export const updateCar = async (name:string, color:string, id:string) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      name: name,
      color: color
    })
  });
  return {
    data: await response.json(),
  }
}