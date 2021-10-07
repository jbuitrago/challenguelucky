import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';

@Injectable()
export class AddressService {
    
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async create(street:string,cityId:number
      ): Promise<undefined> {
        try {
          const sql = 'INSERT INTO address(street,cityId) VALUES($1,$2)';
          const values = [street,cityId];
          // Inserto el profile
          const result = await this.conn.query(sql, values);
          if (result.rowCount > 0) {
            console.log('se creo correctamente la direccion');
            console.log('address:',result);// TODO: rows[0] no trae nada
            return result.rows;
          }
          return null;
        } catch (error) {
          console.log('error:', error);
          return error;
        }
      }

      async find(street:string,cityId:number): Promise<any> {
        const sql = 'SELECT max(id) as id FROM address WHERE street = $1 and cityId=$2';
        const values = [street,cityId];
        const res = await this.conn.query(sql, values);
        return res.rows;
      }
}
