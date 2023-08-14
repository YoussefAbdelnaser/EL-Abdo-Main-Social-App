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
