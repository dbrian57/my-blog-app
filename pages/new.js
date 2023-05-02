import { useState } from "react";
import Router from "next/router";

export default function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (response.ok) {
      await response.json();
      Router.push("/");
    }
  }

  return (
    <div>
      <h1 class="title">New Post</h1>
      <form onSubmit={handleSubmit}>
        <div class="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            class="inputField"
          />
        </div>
        <div class="field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            class="inputField"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

