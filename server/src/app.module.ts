import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/product.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { BannerModule } from './banner/banner.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const ENV = process.env.NODE_ENV;
console.log('ENV:',ENV, 'prod',ENV === 'prod');
const dbInfo = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
};
if (ENV === 'prod') {
  dbInfo.host = '8.134.124.51';
  dbInfo.port = 3306;
  dbInfo.username = 'root';
  dbInfo.password = 'root';
}
const { host, port, username, password } = dbInfo;
console.log('dbInfo: ', dbInfo);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username,
      password,
      database: 'nest_cms_api',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    ProductCategoriesModule,
    AboutModule,
    HomeModule,
    BannerModule,
    UploadModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
