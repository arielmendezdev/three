import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import pg from 'pg';
import { User } from './database/models/user.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PGHOST || process.env.DB_HOST,
      username: process.env.PGUSER || process.env.DB_USERNAME,
      database: process.env.PGDATABASE || process.env.DB_DATABASE,
      password: process.env.PGPASSWORD || process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      // username: process.env.PGUSER,
      // password: process.env.PGPASSWORD,
      // database: process.env.PGDATABASE,
      // host: process.env.PGHOST,
      dialectModule: pg,
      dialectOptions: {
        ssl: {
          require: true, // Requiere SSL
          rejectUnauthorized: false, // Si es un certificado auto-firmado
        },
      },
      models: [User],
    }),
    SequelizeModule.forFeature([User]),
    UsersModule
  ],
  exports: [SequelizeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
