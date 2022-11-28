// @type {import('next').NextConfig} //
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    "CLOUDINARY_CLOUD": "dvopyvz7r",
    "CLOUDINARY_ABOUT": "whe6ndum",
    "CLOUDINARY_LOGO": "i0wjlsai",
    "CLOUDINARY_PRODUCTS": "r94njzcs",
    "CLOUDINARY_SLIDER": "slider",
    "CLOUDINARY_USER_PROFILE": "mfrtuke4",
    "EMAILJS_SERVICE_ID": "service_hys4ifl", // newsletter & order confirmation
    "EMAILJS_PUBLIC_KEY": "5FIkK-QM1cvwFbl44", // newsletter & order confirmation
    "ËMAILJS_SERVICE_ID_2": "service_bi4qxyc", // contact form & dispatch order
    "EMAILJS_PUBLIC_KEY_2": "wFh_Z1YLlso9SqHw0", // contact form & dispatch order
    "STATUS": "dev",
  }
  ,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    disableStaticImages: false,
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],

    unoptimized: false,
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
      "acegif.com",
      "thumbs.gfycat.com",
      "media.tenor.com",
      "www.genusdei.it",
      "upload.wikimedia.org",
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