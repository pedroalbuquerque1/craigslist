import bikeImage from "../assets/listings/bike1.png";
import headphonesImage from "../assets/listings/headphones1.png";
import mapBackgroundImage from "../assets/listings/map-bg.png";
import shoesImage from "../assets/listings/shoes1.png";
import sofaImage from "../assets/listings/sofa1.png";
import watchImage from "../assets/listings/watch1.png";

export interface ClassifiedItem {
  id: string;
  title: string;
  price: number;
  category: string;
  categoryColor: string;
  categoryTextColor: string;
  description: string;
  condition: string;
  type: string;
  location: string;
  locationDetail: string;
  distance: string;
  publishedTime: string;
  seller: {
    name: string;
    memberSince: string;
    rating: number;
    reviews: number;
    verified: boolean;
  };
  images: string[];
}

export const mockItems: ClassifiedItem[] = [
  {
    id: "1",
    title: "Bicicleta de Estrada Specialized Tarmac SL7 - Tamanho 54",
    price: 2450,
    category: "Desporto e Lazer",
    categoryColor: "#62ff96",
    categoryTextColor: "#005226",
    description: "Bicicleta em estado irrepreensível, com pouco uso. Equipada com Shimano Ultegra Di2, rodas de carbono Roval e pneus novos. Recentemente revisionada por especialistas. Excelente oportunidade para quem procura performance e conforto. Motivo de venda: upgrade para modelo superior.",
    condition: "Como Novo",
    type: "Estrada / Carbono",
    location: "Lisboa, Arroios",
    locationDetail: "Lisboa, Arroios",
    distance: "2km",
    publishedTime: "há 2 horas",
    seller: {
      name: "Alex Community",
      memberSince: "2021",
      rating: 4.8,
      reviews: 124,
      verified: true,
    },
    images: [bikeImage],
  },
  {
    id: "2",
    title: "Smartwatch Pro",
    price: 1200,
    category: "Tecnologia",
    categoryColor: "#00affe",
    categoryTextColor: "#003f5f",
    description: "Smartwatch em excelente estado, com todos os acessórios originais. Monitor cardíaco, GPS integrado, resistente à água.",
    condition: "Usado",
    type: "Eletrônico",
    location: "Lisboa, Centro",
    locationDetail: "Lisboa, Centro",
    distance: "2km",
    publishedTime: "há 4 horas",
    seller: {
      name: "Tech Store",
      memberSince: "2020",
      rating: 4.5,
      reviews: 89,
      verified: true,
    },
    images: [watchImage],
  },
  {
    id: "3",
    title: "Tênis Corrida Nitro",
    price: 350,
    category: "Desporto e Lazer",
    categoryColor: "#62ff96",
    categoryTextColor: "#005226",
    description: "Tênis de corrida profissional, tamanho 42, muito confortável e em ótimo estado.",
    condition: "Seminovo",
    type: "Calçado",
    location: "Lisboa, Benfica",
    locationDetail: "Lisboa, Benfica",
    distance: "5km",
    publishedTime: "há 1 dia",
    seller: {
      name: "Running Shop",
      memberSince: "2019",
      rating: 4.9,
      reviews: 156,
      verified: true,
    },
    images: [shoesImage],
  },
  {
    id: "4",
    title: "Sofá Retrátil Premium",
    price: 4500,
    category: "Móveis",
    categoryColor: "#a3d5ff",
    categoryTextColor: "#003d5f",
    description: "Sofá retrátil de 3 lugares, tecido premium, muito confortável. Ideal para sala de estar.",
    condition: "Seminovo",
    type: "Sofá",
    location: "São Paulo, SP",
    locationDetail: "São Paulo, SP",
    distance: "8km",
    publishedTime: "há 2 dias",
    seller: {
      name: "Móveis Casa",
      memberSince: "2018",
      rating: 4.7,
      reviews: 203,
      verified: true,
    },
    images: [sofaImage],
  },
  {
    id: "5",
    title: "Fone de Ouvido Premium Wireless",
    price: 850,
    category: "Tecnologia",
    categoryColor: "#00affe",
    categoryTextColor: "#003f5f",
    description: "Fone de ouvido sem fio com cancelamento de ruído ativo, bateria de longa duração e qualidade de som excepcional.",
    condition: "Como Novo",
    type: "Áudio",
    location: "Lisboa, Centro",
    locationDetail: "Lisboa, Centro",
    distance: "3km",
    publishedTime: "há 5 horas",
    seller: {
      name: "Marcos Silva",
      memberSince: "2020",
      rating: 4.6,
      reviews: 78,
      verified: true,
    },
    images: [headphonesImage],
  },
];

export const categories = [
  {
    id: "services",
    name: "Serviços",
    subtitle: "Profissionais para tudo",
    icon: "wrench",
    color: "#006832",
    bgColor: "#c3f4d9",
  },
  {
    id: "properties",
    name: "Imóveis",
    subtitle: "Aluguel e venda",
    icon: "home",
    color: "#0369a1",
    bgColor: "#bae6fd",
  },
  {
    id: "sales",
    name: "Vendas",
    subtitle: "Usados e novos",
    icon: "shopping-bag",
    color: "#7c3aed",
    bgColor: "#ddd6fe",
  },
];

export { mapBackgroundImage };
