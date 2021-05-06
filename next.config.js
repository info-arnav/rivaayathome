module.exports = {
    async headers() {
      return [
        {
          source: "/api/users/sitemap.xml",
          headers: [
            {
              key: "Content-Type",
              value: "application/xml",
            },
          ],
        },
        {
          source: "/api/posts/sitemap.xml",
          headers: [
            {
              key: "Content-Type",
              value: "application/xml",
            },
          ],
        },
        {
          source: "/api/image/users/sitemap.xml",
          headers: [
            {
              key: "Content-Type",
              value: "application/xml",
            },
          ],
        },
        {
          source: "/api/image/posts/sitemap.xml",
          headers: [
            {
              key: "Content-Type",
              value: "application/xml",
            },
          ],
        },
      ];
    },
    i18n: {
      locales: ["en-us", "en-in", "en-nl"],
      defaultLocale: "en-us",
      domains: [
        {
          domain: "www.daisforall.com",
          defaultLocale: "en-us",
        },
  
        {
          domain: "www.daisforall.in",
          defaultLocale: "en-in",
        },
        {
          domain: "www.infinity.cyou",
          defaultLocale: "en-nl",
        },
        {
          domain: "www.daisonline.com",
          defaultLocale: "en-nl",
        },
        {
          domain: "www.arnavgupta.net",
          defaultLocale: "en-nl",
        },
        {
          domain: "www.passionatebloggers.me",
          defaultLocale: "en-nl",
        },
      ],
    },
  };
  