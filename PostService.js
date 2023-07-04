import Post from "./Post.js";
import FileService from "./fileService.js";

class PostService {
  async create(post, picture) {
    const fileName = FileService.saveFile(picture);
    const newPost = await Post.create({ ...post, picture: fileName });
    return newPost;
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }

  async getById(id) {
    if (!id) {
      throw new Error("ID is required");
    }
    const post = await Post.findById(id);
    return post;
  }

  async update(post) {
    if (!post._id) {
      throw new Error("ID is required");
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error("ID is required");
    }
    const post = await Post.findByIdAndDelete(id);
    return post;
  }
  async deleteAll(posts) {
    const arr = [];
    posts = JSON.parse(JSON.stringify(posts));
    posts.map(async (post) => {
      const deleted = await Post.findByIdAndDelete(post._id);
      arr.push(deleted);
    });

    console.log(posts);
    return posts;
  }
}

export default new PostService();
