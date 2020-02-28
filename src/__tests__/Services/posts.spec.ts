import { randomPost, createManyPosts } from "../../helpers/PostHelpers";
import {
  createPost,
  allPosts,
  getPost,
  updatePost,
  deletePost,
  filterPosts
} from "../../services/posts.service";
import { randomUser } from "../../helpers/UserHelpers";
import { User } from "../../entity/User";
import { PostInterface, Post } from "../../entity/Post";
import { testConn } from "../../test-utils/testConn";

beforeAll(async () => {
  await testConn();
});

beforeEach(async () => {
  await Post.clear();
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
      await createManyPosts(5);
      const posts = await allPosts({});
      expect(posts).toBeDefined();
      expect(posts.length).toEqual(5);
    });
  });

  describe("#getPost", () => {
    it("should return post by given uuid", async () => {
      const created = await randomPost({ title: "This is my new post" });

      const post = await getPost(created.uuid);

      expect(post).toBeDefined();
      expect(post?.uuid).toEqual(created.uuid);
      expect(post?.title).toEqual(created.title);
    });

    it("should return null because no post is found", async () => {
      const post = await getPost("not-existing-token");
      expect(post).toBeNull();
    });
  });

  describe("#updatePost", () => {
    it("should update post and return updated result", async () => {
      const post = await randomPost();
      const updateData: PostInterface = {
        title: "updated title",
        description: "updated description",
        tags: ["some", "cool", "tag"]
      };

      const updated = await updatePost(post.uuid, updateData);

      expect(updated).toBeDefined();
      expect(updated?.uuid).toEqual(post.uuid);
      expect(updated?.title).toEqual(updateData.title);
      expect(updated?.description).toEqual(updateData.description);
      expect(updated?.tags).toEqual(updateData.tags);
    });
  });

  describe("#deletePost", () => {
    it("should destroy post by given uuid", async () => {
      const post = await randomPost();

      await deletePost(post.uuid);
      const find = await getPost(post.uuid);

      expect(find).toBeNull();
    });
  });

  describe("#filterPosts", () => {
    it("should filter posts by given searchTerm", async () => {
      const author = await randomUser();
      const post1 = await randomPost({
        author: author,
        title: "Banana bread"
      });
      const post2 = await randomPost({
        author: author,
        title: "Apple bread",
        description: "Tasty like banana bread"
      });
      await randomPost({
        author: author,
        title: "bread",
        description: "apple bread is tasty"
      });

      const posts = await filterPosts({
        searchTerm: "banana",
        userId: author.id
      }).getMany();

      expect(posts.length).toEqual(2);
      expect(posts.map(({ id }) => id)).toContain(post1.id);
      expect(posts.map(({ id }) => id)).toContain(post2.id);
    });

    it("should filter posts by given searchTerm and userId", async () => {
      const author = await randomUser();
      const author1 = await randomUser();
      await randomPost({
        author: author,
        title: "Banana bread"
      });
      const post2 = await randomPost({
        author: author1,
        title: "Apple bread",
        description: "Tasty like banana bread"
      });
      await randomPost({
        author: author,
        title: "bread",
        description: "apple bread is tasty"
      });

      const posts = await filterPosts({
        searchTerm: "banana",
        userId: author1.id
      }).getMany();

      expect(posts.length).toEqual(1);
      expect(posts.map(({ id }) => id)).toContain(post2.id);
    });
  });
});
