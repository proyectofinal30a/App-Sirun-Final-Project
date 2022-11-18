/ @type {import('next').NextConfig} /
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "www.unsplash.com",
      "www.madapatisserie.com",
      "www.recipetineats.com",
      "drive.google.com",
      "res.cloudinary.com",
      "esruiz.com.ar",
      "cdn.shopify.com",
      "d3ugyf2ht6aenh.cloudfront.net",
      "s1.eestatic.com",
      "i2.wp.com",
      "recetasdecocina.elmundo.es",
      "simplelivingrecipes.com",
      "celebratingsweets.com",
      "encrypted-tbn0.gstatic.com",
      "i.blogs.es",
      "www.sweetestmenu.com",
      "izzycooking.com",
      "cuk-it.com",
      "www.mashed.com",
      "img-global.cpcdn.com",
      "elcomercio.pe",
      "www.cucinare.tv",
      "www.syntegon.com",
      "izzycooking.com",
      "elcomercio.pe",
      "img-global.cpcdn.com",
      "www.cucinare.tv",
      "www.recetasderechupete.com",
      "www.pequerecetas.com",
      "www.syntegon.com",
      "annaspasteleria.com",
      "tastesbetterfromscratch.com",
      "cdn7.kiwilimon.com",
      "www.petitchef.es",
      "cdn2.cocinadelirante.com",
      "cdn2.cocinadelirante.com",
      "gastronomiaycia.republica.com",
      "resizer.glanacion.com",
      "media0.giphy.com",
      "s.gravatar.com",
      "hackernoon.com",
      "**"
    ],
    async redirects() {
      return [
        {
          source: "/api/adminScope",
          destination: "/",
          permanent: true,
        },
      ];
    },
  },
};

module.exports = nextConfig;