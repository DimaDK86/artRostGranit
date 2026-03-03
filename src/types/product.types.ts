export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: 'monument' | 'fence' | 'table' | 'other';
  material?: string;
  sizes?: string;
}

import img1 from '@/assets/images/product/1.jpg';
import img3 from '@/assets/images/product/3.jpg';
import img7 from '@/assets/images/product/7.jpg';
import img8 from '@/assets/images/product/8.jpg';
import img12 from '@/assets/images/product/12.jpg';
import img13 from '@/assets/images/product/13.jpg';

// Временные данные для примера
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Памятник вертикальный "Классика"',
    price: 35000,
    image: img1,
    description: 'Вертикальный памятник из габбро-диабаза',
    material: 'Габбро-диабаз',
    sizes: '100x50x8 см'
  },
  {
    id: '2',
    name: 'Памятник горизонтальный "Стандарт"',
    price: 28000,
    image: img3,
    description: 'Горизонтальная плита из гранита',
    material: 'Гранит',
    sizes: '120x60x5 см'
  },
  {
    id: '3',
    name: 'Памятник "Сердце"',
    price: 42000,
    image: img7,
    description: 'Памятник в форме сердца из карельского гранита',
    material: 'Карельский гранит',
    sizes: '80x80x8 см'
  },
  {
    id: '4',
    name: 'Памятник "Крест"',
    price: 39000,
    image: img8,
    description: 'Памятник с гравировкой креста',
    material: 'Габбро-диабаз',
    sizes: '100x60x8 см'
  },
  {
    id: '5',
    name: 'Памятник "Семейный"',
    price: 55000,
    image: img12,
    description: 'Двойной памятник для семейного захоронения',
    material: 'Гранит',
    sizes: '150x70x8 см'
  },
  {
    id: '6',
    name: 'Памятник "Монумент"',
    price: 68000,
    image: img13,
    description: 'Большой монументальный памятник',
    material: 'Гранит',
    sizes: '120x80x10 см'
  }
];