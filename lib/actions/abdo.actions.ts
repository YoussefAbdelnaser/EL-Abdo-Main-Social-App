"use server";

import { revalidatePath } from "next/cache";
import Abdo from "../models/abdo.model";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

//create a new post
export async function tellAbdo({ text, author, communityId, path }: Params) {
  try {
    connectToDatabase();
    const createAbdo = await Abdo.create({
      text,
      author,
      communityId: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { abdo: createAbdo._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating abdo: ${error.message}`);
  }
}

//get posts
export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDatabase();

  //calculate posts to skip to get page number
  const skipAmount = (pageNumber - 1) * pageSize;

  //top level posts (not comments)
  const postsQuery = Abdo.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id username parentId image",
      },
    });

  const totalPostsCount = await Abdo.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

//get post by id
export async function fetchPostById(id: string) {
  connectToDatabase();

  try {
    //TODO:populate community
    const abdo = await Abdo.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          { path: "author", model: User, select: "id _id parentId image" },
          {
            path: "children",
            model: "Abdo",
            populate: {
              path: "author",
              model: User,
              select: "id _id name parentId image",
            },
          },
        ],
      })
      .exec();

    return abdo;
  } catch (error: any) {
    throw new Error(`Error fetching post by id: ${error.message}`);
  }
}
