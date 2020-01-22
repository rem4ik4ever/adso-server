import { Resolver, Query } from "type-graphql";

@Resolver()
export class RootResolver{
    
    @Query(() => String)
    async hello() {
        return "Hello World"
    }
}