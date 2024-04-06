import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {mongoose} from 'mongoose';
§

const DB_USER = 'neginDb';
const DB_USER_PASSWORD = 'nLVZd9xMAyuTNgyQ';
const DB_CLUSTER = 'cluster0.tgc1gdl.mongodb.net';
const DB_NAME = 'Comp3133_Assignment1';
const uri = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;
await mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success:any) => {
    console.log('Success Mongodb connection');
  })
  .catch((err) => {
    console.log('Error Mongodb connection');
  });

// const uri = 'https://employee-management-graphql.vercel.app/graphql'; 
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
