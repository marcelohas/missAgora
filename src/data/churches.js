export const churches = [
  {
    id: 1,
    name: "Catedral Metropolitana",
    address: "Praça da Sé, s/n",
    city: "São Paulo",
    neighborhood: "Sé",
    coordinates: { lat: -23.5503099, lng: -46.6342009 },
    massTimes: {
      0: ["09:00", "11:00", "17:00"], // Domingo
      1: ["07:00", "12:00", "18:00"], // Segunda
      2: ["07:00", "12:00", "18:00"], // Terça
      3: ["07:00", "12:00", "18:00"], // Quarta
      4: ["07:00", "12:00", "18:00"], // Quinta
      5: ["07:00", "12:00", "18:00"], // Sexta
      6: ["09:00", "15:00"],          // Sábado
    },
  },
  {
    id: 2,
    name: "Paróquia Nossa Senhora do Brasil",
    address: "Praça Nossa Sra. do Brasil, 01",
    city: "São Paulo",
    neighborhood: "Jardim América",
    coordinates: { lat: -23.5678, lng: -46.6694 },
    massTimes: {
      0: ["08:30", "10:00", "11:30", "18:30", "20:00"],
      1: ["07:30", "11:00", "18:30"],
      2: ["07:30", "11:00", "18:30"],
      3: ["07:30", "11:00", "18:30"],
      4: ["07:30", "11:00", "18:30"],
      5: ["07:30", "11:00", "18:30"],
      6: ["09:00", "12:00", "16:00"],
    },
  },
  {
    id: 3,
    name: "Igreja da Consolação",
    address: "Rua da Consolação, 585",
    city: "São Paulo",
    neighborhood: "Consolação",
    coordinates: { lat: -23.5496, lng: -46.6447 },
    massTimes: {
      0: ["08:00", "10:00", "12:00", "18:00"],
      1: ["07:00", "19:00"],
      2: ["07:00", "19:00"],
      3: ["07:00", "19:00"],
      4: ["07:00", "19:00"],
      5: ["07:00", "19:00"],
      6: ["08:00", "17:00"],
    },
  },
   {
    id: 4,
    name: "Paróquia São José",
    address: "Rua Dinamarca, 32",
    city: "São Paulo",
    neighborhood: "Jardim Europa",
    coordinates: { lat: -23.5741, lng: -46.6765 },
    massTimes: {
      0: ["09:30", "11:30", "19:00"],
      1: ["17:00"],
      2: ["17:00"],
      3: ["17:00"],
      4: ["17:00"],
      5: ["17:00"],
      6: ["16:00"],
    },
  },
];
