import villa1 from './villa_1.json';
import villa2 from './villa_2.json';
import villa3 from './villa_3.json';
import villa4 from './villa_4.json';
import villa5 from './villa_5.json';
import villa6 from './villa_6.json';
import villa7 from './villa_7.json';
import villa8 from './villa_8.json';
import villa9 from './villa_9.json';
import villa10 from './villa_10.json';
import villa11 from './villa_11.json';
import villa12 from './villa_12.json';
import villa13 from './villa_13.json';
import villa14 from './villa_14.json';

export type Villa = {
  id: string | number;
  name: string;
  description: string;
  banner: string;
  images?: Array<string>;
  bedrooms?: number;
  baths?: number;
  sleeps?: number;
  externalLink?: string;
};

const villas: Array<Villa> = [
  villa1,
  villa2,
  villa3,
  villa4,
  villa5,
  villa6,
  villa7,
  villa8,
  villa9,
  villa10,
  villa11,
  villa12,
  villa13,
  villa14,
];

export default villas;
