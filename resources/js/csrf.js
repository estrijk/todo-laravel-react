
export default async function (url, body) {
    const csrf = document.head.querySelector('meta[name="csrf-token"]').content;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrf
      },
      body: JSON.stringify(body)
    });

    return await response.json();
  }