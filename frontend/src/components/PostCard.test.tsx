import { render, screen } from "@testing-library/react";
import React from "react";
import PostCard from "./PostCard";

const data = {
  id: "postId",
  authorId: "authorId",
  authorName: "authorName",
  photoUrl: "photoUrl",
  caption: "caption",
  createdAt: new Date().toISOString(),
};

test("shoudl PostCard show photo", () => {
  const { getByAltText } = render(<PostCard post={data} />);
  const image = getByAltText("");
  expect(image).toHaveAttribute("src", "photoUrl");
});

test("shoudl PostCard show authorName", () => {
  render(<PostCard post={data} />);
  const authorName = screen.getByText(data.authorName);
  expect(authorName).toBeInTheDocument();
});

test("shoudl PostCard show caption", () => {
  render(<PostCard post={data} />);
  const caption = screen.getByText(data.caption);
  expect(caption).toBeInTheDocument();
});

test("shoudl PostCard show createdAt", () => {
  render(<PostCard post={data} />);
  const createdAt = screen.getByText(data.createdAt);
  expect(createdAt).toBeInTheDocument();
});
