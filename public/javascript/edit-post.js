async function editFormHandler(event) {
  event.preventDefault();

  // Get the data for the post and the post id
  const title = document
    .querySelector('input[name="post-title"]')
    .value.trim();
    // pulls id from url
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
//   Replaces the title text
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
//   Awaits repsonse from the server
  if (response.ok) {
    //   Changes to dashboard if valid
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

// Click response
document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
