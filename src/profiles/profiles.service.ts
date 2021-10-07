import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';

@Injectable()
export class ProfilesService {
    
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async create(userId,addressId,name): Promise<undefined> {
        try {
          const sql = 'INSERT INTO profile(userId,addressId,name) VALUES($1,$2,$3)';
          const values = [userId, addressId,name];
          // Inserto el profile
          const result = await this.conn.query(sql, values);
          if (result.rows.length > 0) {
            console.log('se creo correctamente el profile');
            return result.rows;
          }
          return null;
        } catch (error) {
          console.log('error:', error);
          return error;
        }
      }


}
