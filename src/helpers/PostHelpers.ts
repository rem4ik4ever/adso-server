import { Post } from "../entity/Post";
import faker from "faker";
import { randomUser } from "./UserHelpers";

export const randomPost = async (props?: any): Promise<Post> => {
  const data = {
    title: faker.name.title(),
    description: faker.lorem.paragraph(),
    author: await randomUser(),
    tags: new Array(4).map(() => faker.random.word()),
    images: new Array(4).map(() => faker.random.image()),
    priceInfo: "fixed",
    price: faker.random.number() + faker.random.number(100) / 100,
    address: faker.address.streetAddress(),
    latitude: faker.address.latitude,
    longitude: faker.address.longitude,
    active: true
  };
  console.log("* Creating a post!");
  return await Post.create({
    ...data,
    ...props
  }).save();
};

export const createManyPosts = (num: number): Promise<any[]> => {
  const ls = new Array(num);
  return Promise.all(ls.map(() => randomPost()));
};
