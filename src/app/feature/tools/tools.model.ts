interface SampleModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  cities: string[];
  movies: string[];
  cars: Car[];
}

interface Car {
  brand: string;
  color: string;
}
