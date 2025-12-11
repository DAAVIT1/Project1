// Simple in-memory store to avoid external DB for demo/deploy.
// Data resets on server restart.
const { randomUUID } = require("crypto");

const users = [
  {
    id: "u1",
    _id: "u1",
    username: "demo",
    email: "demo@example.com",
    password:
      "$2b$10$V1pQurC5EvhczHxVh9Yx8u1Sxpv8uKUa95syEHCqB6f0GO6zkRg7i", // "password"
    img: "",
    isAdmin: true,
    createdAt: new Date(),
  },
];

const posts = [
  {
    id: "p1",
    _id: "p1",
    title: "Welcome to the blog",
    desc: "Sample post stored in memory. Add your own posts from Admin.",
    img: "",
    userId: "u1",
    slug: "welcome",
    createdAt: new Date(),
  },
];

const makeId = () => randomUUID();

export const getAllPosts = () => [...posts];

export const getPostBySlug = (slug) =>
  posts.find((p) => p.slug === slug) || null;

export const addPost = ({ title, desc, slug, userId, img }) => {
  if (posts.some((p) => p.slug === slug)) {
    throw new Error("Slug already exists");
  }
  const id = makeId();
  const post = {
    id,
    _id: id,
    title,
    desc,
    slug,
    userId,
    img: img || "",
    createdAt: new Date(),
  };
  posts.push(post);
  return post;
};

export const deletePostById = (id) => {
  const idx = posts.findIndex((p) => p.id === id || p._id === id);
  if (idx >= 0) posts.splice(idx, 1);
};

export const deletePostBySlug = (slug) => {
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx >= 0) posts.splice(idx, 1);
};

export const getAllUsers = () => [...users];

export const getUserById = (id) =>
  users.find((u) => u.id === id || u._id === id) || null;

export const getUserByUsername = (username) =>
  users.find((u) => u.username === username) || null;

export const addUser = ({ username, email, password, img, isAdmin = false }) => {
  const id = makeId();
  const user = {
    id,
    _id: id,
    username,
    email,
    password,
    img: img || "",
    isAdmin,
    createdAt: new Date(),
  };
  users.push(user);
  return user;
};

export const deleteUserById = (id) => {
  const idx = users.findIndex((u) => u.id === id || u._id === id);
  if (idx >= 0) users.splice(idx, 1);
  // also remove their posts
  for (let i = posts.length - 1; i >= 0; i--) {
    if (posts[i].userId === id) posts.splice(i, 1);
  }
};

