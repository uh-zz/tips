async function postWithTimeout(url, ms) {
  const fetch = require("node-fetch");
  const AbortController = require("node-abort-controller");

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, ms);

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: 0, name: "hogehoge" }),
    signal: controller.signal, // シグナルを渡しておく
  };

  try {
    const response = await fetch(url, options);
    const body = await response.json();
    return JSON.stringify(body);
  } catch (error) {
    if (error.type == "aborted") {
      console.log(`the user aborted a request.`);
      throw new Error(JSON.stringify({ type: "abort" }));
    }

    throw new Error(JSON.stringify({ type: "other" }));
  } finally {
    clearTimeout(timeout);
  }
}
