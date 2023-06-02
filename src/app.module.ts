import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ApiTokenCheckMiddleware } from './common/api-token-check.middleware';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { RecipesModule } from './recipes/recipes.module';
import { Recipe } from './recipes/recipe.entity';
import { IngredientsModule } from './ingredients/ingredients.module';
import { Ingredient } from './ingredients/ingredient.entity';
import { Feedback } from './feedbacks/feedback.entity';
import { SearchAttemptsModule } from './search-attempts/search-attempts.module';
import { SearchAttempt } from './search-attempts/searchattempt.entity';

const entities = [User, Recipe, Ingredient, Feedback, SearchAttempt];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      database: "flavorfinder",
      username: "username",
      password: "mysql",
      entities: entities,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    FeedbacksModule,
    RecipesModule,
    IngredientsModule,
    SearchAttemptsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiTokenCheckMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
