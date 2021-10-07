import { Test, TestingModule } from '@nestjs/testing';
import { User, UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it.each`
    name      | returnVal
    ${'Jorge'} | ${{ username: 'jbuitrago', password: '123456789' }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ name, returnVal }: { name: string; returnVal: User }) => {
      expect(await service.find(name)).toEqual(returnVal);
    },
  );
});
