import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';

@Injectable()
export class CitiesService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async find(cityId: number): Promise<any> {
    const sql = 'SELECT * FROM city WHERE id = $1';
    const values = [cityId];
    const res = await this.conn.query(sql, values);
    return res.rows;
  }
}
