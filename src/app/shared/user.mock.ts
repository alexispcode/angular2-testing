import { User } from './user.model'

export const usersMock: User[] = [{
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Robert Rodriguez',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 3,
    name: 'Carlos Perez',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 4,
    name: 'Jose Gimenez',
    username: 'Bret',
    email: 'Sincere@april.biz',
  }
];

export const firstUserMock: User = usersMock[0];
