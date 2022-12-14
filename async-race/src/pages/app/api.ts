const server = 'http://127.0.0.1:3000';

const garage = `${server}/garage`;
const winners = `${server}/winners`;
const startStopServ = `${server}/engine`;

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
  const resp = await fetch(`${winners}/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) { 
      console.log(`winner ${id} deleted`);
    }
    else {
      console.log("HTTP request unsuccessful")
    }
  })
}

export const getCar = async (id:string) => {
  const response = await fetch(`${garage}/${id}`);  
  if (response.ok) { 
    return {
      data: await response.json(),
    }
  }
  else {
    throw new Error('Car with this id does not exist');
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

export const startStopEngine = async (id:string, status:string) => {
  const response = await fetch(`${startStopServ}?id=${id}&status=${status}`,
  {
    method: 'PATCH',
  });
    return {
      data: await response.json()
    }
}
export const switchCarEngine = async (id:string, status:string) => {
  const response = await fetch(`${startStopServ}?id=${id}&status=${status}`,
  {
    method: 'PATCH',
  });
  if (response.ok) { 
    return {
      status: await response.json(),
    }
  } else if (response.status == 500) { 
    return {
      status: 'stopped',
    }
  }
}

export const getWinners = async (page:number, sort:string, order:string, limit = 10) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  return {
    data: await response.json(),
    carsCount: response.headers.get('X-Total-Count'),
  }
}
export const getWinner = async (id:string) => {
  const response = await fetch(`${winners}/${id}`);  
  if (response.ok) { 
    return {
      data: await response.json(),
    }
  }
  else {
    throw new Error('Car with this id does not exist');
  }
}

export const createWinners = async (id:string, time:string) => {
  const response = await fetch(`${winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
      body: JSON.stringify({
        id: id,
        wins: 1,
        time: time
    })
  });

  return await response.json();
  
}


export const updateWinner = async (wins:string, time:string, id:string) => {
  const response = await fetch(`${winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      wins: wins,
      time: time
    })
  });
  return {
    data: await response.json(),
  }
}