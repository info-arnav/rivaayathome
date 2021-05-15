import Heads from "next/head";

export default function Head({
  title = "DaisForAll | Live thousand lives in one world",
  url = "https://www.daisforall.com/",
  about = "DaisForAll is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.",
  image = "https://www.daisforall.com/logo.png",
  alt = "This is the official logo of DaisForAll platform.",
  keywords = "",
  script = "",
}) {
  const logo = "https://www.daisforall.com/logo.png";
  const logoAlt = "This is the official logo of DaisForAll platform.";

  keywords =
    keywords +
    ", daisforall, infinity, blogs, share, platform, live thousand live in one world, passionate bloggers, dais, cyou";
  return (
    <Heads>
      {/* Langauges */}
      <link
        key={0}
        rel="alternate"
        href="https://www.daisforall.com/"
        hrefLang="x-default"
      />
      <link
        key={1}
        rel="alternate"
        href="https://www.daisforall.com/"
        hrefLang="en-us"
      />
      <link
        key={2}
        rel="alternate"
        href="https://www.infinity.cyou/en-nl/"
        hrefLang="en-nl"
      />
      <link
        key={3}
        rel="alternate"
        href="https://www.arnavgupta.net/en-nl/"
        hrefLang="en-nl"
      />
      <link
        key={4}
        rel="alternate"
        href="https://www.passionatebloggers.me/en-nl/"
        hrefLang="en-nl"
      />
      <link
        key={5}
        rel="alternate"
        href="https://www.daisonline.com/en-nl/"
        hrefLang="en-nl"
      />
      <link
        key={6}
        rel="alternate"
        href="https://www.daisforall.in/en-in/"
        hrefLang="en-in"
      />
      {/* Same or simmiliar sites */}
      <script
        key={7}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebSite",
            colleague: [],
            image: logo,
            name: "Arnav Gupta",
            url: url,
            sameAs: [
              "https://www.youtube.com/channel/UCzzfqCy-j9XZA5KNosqzh6w",
              "https://www.arnavgupta.net//en-nl/",
              "https://www.infinity.cyou//en-nl/",
              "https://www.daisforall.com/",
              "https://www.daisonline.com/en-nl/",
              "ananyagupta.net",
              "ananya gupta",
              "anuja gupta",
              "amit gupta",
              "god",
              "veena",
              "ashok",
              "rekha",
              "kailash",
              "gaurav",
              "reyansh",
              "priyajan",
              "https://www.daisforall.in//en-in/",
              "https://www.passionatebloggers.me/en-nl/",
              "https://www.instagram.com/infinity.newtech/",
              "https://www.linkedin.com/in/arnav-gupta-0922341a9/",
              "https://www.facebook.com/infinity.newTechnology",
              "https://twitter.com/infinityNewTech",
            ],
          }),
        }}
      />
      {/* Basic */}
      <title key="8">{title}</title>
      <meta key="9" name="description" content={about} />
      <meta key="10" name="robots" content="index, follow" />
      {/* Twitter */}
      <meta key="11" name="twitter:card" content={"summary"} />
      <meta key="12" name="twitter:site" content="@infinityNewTech" />
      <meta key="13" name="twitter:creator" content="@infinityNewTech" />
      <meta key="14" name="twitter:description" content={about} />
      <meta key="15" name="twitter:image" content={image} />
      <meta key="16" name="twitter:image:alt" content={alt} />
      {/* OG */}
      <meta key="17" property="og:url" content={url} />
      <meta key="19" property="og:title" content={title} />
      <meta key="20" property="og:description" content={about} />
      <meta key="21" property="og:image" content={image} />
      <meta key="22" property="og:image:alt" content={alt} />
      <meta key="23" property="og:title" content={title} />
      <meta key="24" property="og:type" content="website" />
      <meta key="25" property="og:url" content={url} />
      <meta key="26" property="og:locale" content="en_IN" />
      <meta key="27" property="og:site_name" content="Infinity" />
      <meta key="28" property="og:description" content={about} />
      {/* Facebook */}
      <meta key="29" property="fb:app_id" content="478626783320499" />
      {/* Basic */}
      <meta key={31 - 1} name="copyright" content="Infinity" />
      <meta key={32 - 1} name="keywords" content={keywords} />
      <meta key={33 - 1} name="url" content={url} />
      <meta
        key={35 - 1}
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <meta key={36 - 1} name="theme-color" content="#000000" />
      <link key={37 - 1} rel="apple-touch-icon" type="image/png" href={logo} />
      <link key={38 - 1} rel="manifest" href="/manifest.json" />
      <link key={39 - 1} rel="icon" href="/favicon.ico" alt={logoAlt} />
      {/* Twitter */}
      <meta key={40 - 1} name="twitter:title" content={title} />
      {/* Script */}
    </Heads>
  );
}
