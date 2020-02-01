import { randomPost, createManyPosts } from "../../helpers/PostHelpers";
import { createPost, allPosts } from "../../services/posts.service";
import { randomUser } from "../../helpers/UserHelpers";
import { User } from "../../entity/User";
import { PostInterface } from "../../entity/Post";
import { testConn } from "../../test-utils/testConn";

beforeAll(async () => {
  await testConn();
});

describe("Posts Service", () => {
  describe("#randomPost", () => {
    it("should create a random post", async () => {
      const post = randomPost();
      expect(post).toBeDefined();
      expect(post).not.toBeNull();
    });
  });

  describe("#createPost", () => {
    it("should create post from given data", async () => {
      let data: PostInterface = {
        title:
          "ASUS ROG Strix GeForce RTX 2070 Overclocked 8G GDDR6 VR Ready HDMI DP 1.4 USB Type-C Graphics Gaming Card",
        description:
          "<ul>\n  <li>Powered by NVIDIA Turing with 1845 MegaHertz Boost Clock (OC Mode), 2304 CUDA cores and overclocked 8 GigaBytes GDDR6 memory</li>\n  <li>Supports up to 4 monitors with Display Port 1. 4, HDMI 2. 0 and a VR headset via USB Type C ports</li>\n  <li>Auto Extreme and Max Contact Technology deliver premium quality and reliability with aerospace grade Super Alloy Power II components while maximizing heat sink contact</li>\n  <li>ASUS Aura Sync RGB lighting features a nearly endless spectrum of colors with the ability to synchronize effects across an ever expanding ecosystem of AURA Sync enabled products</li>\n  <li>GPU Tweak II makes monitoring performance and streaming in real time easier than ever, and includes additional software like Game Booster, X Split Game caster, WT Fast and Quantum Cloud</li>\n  <li>Triple Axial Tech 0db Fans increase airflow through the heat sink and boasts IP5X dust resistance</li>\n</ul>",
        tags: ["nvidia", "card", "rtx", "2070"],
        images: [
          "https://adso-bucket.s3.amazonaws.com/images-tmp-fld/20191211-1c12648c-7afa-42bb-a6a2-c932ae7ae3e5",
          "https://adso-bucket.s3.amazonaws.com/images-tmp-fld/20191211-115f4d50-d7cd-47f8-a00a-04d969e014ed",
          "https://adso-bucket.s3.amazonaws.com/images-tmp-fld/20191211-036b119e-2e0e-4ea3-b832-0da9301ff107",
          "https://adso-bucket.s3.amazonaws.com/images-tmp-fld/20191211-7ca5bf3f-976b-4447-a6fe-b1f2a5e3cb70",
          "https://adso-bucket.s3.amazonaws.com/images-tmp-fld/20191211-2965ce69-d566-4b75-aac2-63536bd72a4c"
        ],
        priceInfo: "Fixed",
        price: 826.44,
        address: "Newmarket, ON L3X, Canada",
        latitude: 44.0428916,
        longitude: -79.49850909999998,
        active: true
      } as PostInterface;
      let user: User = await randomUser();
      const post = await createPost(data, user);

      expect(post).toBeDefined();
      expect(post.title).toEqual(data.title);
      expect(post.description).toEqual(data.description);
      expect(post.price).toEqual(data.price);
      expect(post.address).toEqual(data.address);
      expect(post.longitude).toEqual(data.longitude);
      expect(post.latitude).toEqual(data.latitude);
      expect(post.images).toEqual(data.images);
      expect(post.tags).toEqual(data.tags);
    });
    it("should create post with no images and tags ", async () => {
      let data: PostInterface = {
        title:
          "ASUS ROG Strix GeForce RTX 2070 Overclocked 8G GDDR6 VR Ready HDMI DP 1.4 USB Type-C Graphics Gaming Card",
        description:
          "<ul>\n  <li>Powered by NVIDIA Turing with 1845 MegaHertz Boost Clock (OC Mode), 2304 CUDA cores and overclocked 8 GigaBytes GDDR6 memory</li>\n  <li>Supports up to 4 monitors with Display Port 1. 4, HDMI 2. 0 and a VR headset via USB Type C ports</li>\n  <li>Auto Extreme and Max Contact Technology deliver premium quality and reliability with aerospace grade Super Alloy Power II components while maximizing heat sink contact</li>\n  <li>ASUS Aura Sync RGB lighting features a nearly endless spectrum of colors with the ability to synchronize effects across an ever expanding ecosystem of AURA Sync enabled products</li>\n  <li>GPU Tweak II makes monitoring performance and streaming in real time easier than ever, and includes additional software like Game Booster, X Split Game caster, WT Fast and Quantum Cloud</li>\n  <li>Triple Axial Tech 0db Fans increase airflow through the heat sink and boasts IP5X dust resistance</li>\n</ul>",
        priceInfo: "Fixed",
        price: 826.44,
        address: "Newmarket, ON L3X, Canada",
        latitude: 44.0428916,
        longitude: -79.49850909999998,
        active: true
      } as PostInterface;
      let user: User = await randomUser();
      const post = await createPost(data, user);

      expect(post.images).toBeNull();
      expect(post.tags).toBeNull();
    });
  });

  describe("#allPosts", () => {
    it("should return multiple posts", async () => {
      const created = await createManyPosts(24);
      console.log("created", created.length);
      const posts = await allPosts({});
      expect(posts).toBeDefined();
      // expect(posts.length).toEqual(24);
    });
  });
});
