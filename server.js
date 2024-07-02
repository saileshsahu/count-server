import { send } from "@netlify/functions";

let pingCount = 0;

export async function handler(event) {
  const { path } = event;

  if (path === "/ping") {
    pingCount++;
    return send({ statusCode: 200, body: "Pong" });
  }

  if (path === "/") {
    return send({
      statusCode: 200,
      body: `
                <html>
                    <head>
                        <title>Stats</title>
                    </head>
                    <body>
                        <h1>Ping Count: ${pingCount}</h1>
                    </body>
                </html>
            `,
    });
  }

  if (path === "/reset") {
    pingCount = 0;
    return send({ statusCode: 200, body: "Ping count has been reset." });
  }

  return send({ statusCode: 404, body: "Not Found" });
}
