// src/index.js
var src_default = {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400"
    };
    function rawHtmlResponse(html) {
      return new Response(html, {
        headers: {
          "content-type": "text/html;charset=UTF-8"
        }
      });
    }
    
    async function handleRequest(request2) {
      const url2 = new URL(request2.url);
      let apiUrl = decodeURIComponent(url2.pathname.split("/url=")[1]);
      if (!apiUrl) {
        return new Response("No valid URL provided", { status: 400 });
      }
      request2 = new Request(apiUrl, request2);
      request2.headers.set("Origin", new URL(apiUrl).origin);
      if (apiUrl.includes("r14.cf1-b08.workers.dev")
      || apiUrl.includes("b4c8d3e9f1a2b7c5d")
      || apiUrl.includes("4928d54d950")) {
        request2.headers.set("Referer", "https://trgoals.xyz/");
      } else {
        request2.headers.set("Referer", new URL(apiUrl).origin + "/");
      }
      let response = await fetch(request2);
      response = new Response(response.body, response);
      response.headers.set("Access-Control-Allow-Origin", url2.origin);
      response.headers.append("Vary", "Origin");
      return response;
    }
    
    async function handleOptions(request2) {
      if (request2.headers.get("Origin") !== null && request2.headers.get("Access-Control-Request-Method") !== null && request2.headers.get("Access-Control-Request-Headers") !== null) {
        return new Response(null, {
          headers: {
            ...corsHeaders,
            "Access-Control-Allow-Headers": request2.headers.get("Access-Control-Request-Headers")
          }
        });
      } else {
        return new Response(null, {
          headers: {
            Allow: "GET, HEAD, POST, OPTIONS"
          }
        });
      }
    }
    
    const url = new URL(request.url);
    if (url.pathname.startsWith("/url=")) {
      if (request.method === "OPTIONS") {
        return handleOptions(request);
      } else if (request.method === "GET" || request.method === "HEAD" || request.method === "POST") {
        return handleRequest(request);
      } else {
        return new Response(null, {
          status: 405,
          statusText: "Method Not Allowed"
        });
      }
    } else {
      return rawHtmlResponse("you're lost");
    }
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
