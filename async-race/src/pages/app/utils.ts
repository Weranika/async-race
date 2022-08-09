const models = ['Peugeot', 'BMW', 'Opel', 'Audi', 'Ford', 'Renault', 'Porshe', 'Lamborgini', 'KIA', 'Mercedes'];
const typeCar = ['Coupe', 'Sedan', 'Combi', 'SUV', '5', '6', 'mini', 'Seria 3', 'Seria 4', '307'];

export const createRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const type = typeCar[Math.floor(Math.random() * typeCar.length)];

  return `${model} ${type}`;
}

export const createRandomColor = () => {
  const numbers = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return `#${color}`;
}

