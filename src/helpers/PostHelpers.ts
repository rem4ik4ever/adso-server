import { Post } from "../entity/Post";
import faker from "faker";
import { randomUser } from "./UserHelpers";
import { InsertResult } from "typeorm";

const randomPostData = async () => {
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraph(),
    author: await randomUser(),
    tags: makeTags(),
    images: makeImages(),
    priceInfo: "fixed",
    price: faker.random.number() + faker.random.number(100) / 100,
    address: faker.address.streetAddress(),
    latitude: faker.address.latitude,
    longitude: faker.address.longitude,
    active: true
  };
};

export const randomPost = async (props?: any): Promise<Post> => {
  return await Post.create({
    ...(await randomPostData()),
    ...props
  }).save();
};

export const createManyPosts = async (num: number): Promise<InsertResult> => {
  const queryBuilder = Post.createQueryBuilder();
  let insertData = [];
  for (let i = 0; i < num; i++) {
    const data = await randomPostData();
    insertData.push(data);
  }
  const result = await queryBuilder
    .insert()
    .values(insertData)
    .execute();
  return result;
};
/* istanbul ignore next */
const makeTags = () => new Array(4).map(() => faker.random.word());
const makeImages = () => new Array(4).map(() => faker.random.image());
