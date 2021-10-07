import { Inject, Injectable, Res } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';
import { CitiesService } from 'src/cities/cities.service';
import { PG_CONNECTION } from 'src/constants';
import { ProfilesService } from 'src/profiles/profiles.service';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(@Inject(PG_CONNECTION) private conn: any,private citiesService:CitiesService, private addressService:AddressService, private profileService: ProfilesService) {}

  async find(username: string): Promise<User | undefined> {
    const sql = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const res = await this.conn.query(sql, values);
    return res.rows;
  }

  async findInfo(id: number): Promise<any> {
    const sqlProfile = 'SELECT * FROM users,profile WHERE users.id = profile.userid  and users.id= $1';
    const valuesProfile = [id];
    const resProfile = await this.conn.query(sqlProfile, valuesProfile);
    const sqlAddres = 'SELECT address.street as street,city.name as city,country.name as country FROM users,profile,address,city,country WHERE users.id = profile.userid and profile.addressid = address.id and address.cityId = city.id and city.countryId = country.id  and users.id=  $1';
    const valuesAddress = [id];
    const resAddress = await this.conn.query(sqlAddres, valuesAddress);
    const result = {
      "id":resProfile.rows[0].id,
      "name":resProfile.rows[0].name,
      "address":resAddress.rows
    }
   return result;
  }

  async create(
    userName,
    password,
    name,
    cityId,
    street,
  ): Promise<User | undefined> {
    try {
      const cities = await this.citiesService.find(cityId);
      if(cities.length === 0){
        return { message:"La ciudad no existe"};
      }
      const users = await this.find(userName);
      if(users.length >= 1){
        return { message:"El usuario ya existe"}
      }
      if(cities){
        const sql = 'INSERT INTO users(username,password) VALUES($1,$2)';
        const values = [userName, password];
        // Inserto el usuario
        const users = await this.conn.query(sql, values);
        if (users.rowCount > 0) {
          //Obtener usuario
          const users = await this.find(userName);
          if(users.length >= 1){
            const userId = users[0].id;
            console.log("El usuario creado fue", users[0].id);
            const address = await this.addressService.create(street,cityId);
            console.log("La direccion fue creada", address)
            const addressId = await this.addressService.find(street,cityId);
            const profiles = await this.profileService.create(userId,addressId[0].id,name);
            console.log("El perfil se creo correctamente:",profiles);
          }

        }
       return {message:"El usuario se creo correctamente"};
      }else{
        return {message:"El usuario NO se creo correctamente"};
      }

    } catch (error) {
      console.log('error:', error);
      return error;
    }
  }
  
}
