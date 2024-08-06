/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['res.cloudinary.com','randomuser.me'],
//       },
//       experimental:{
//         reactRoot: true,
//         suppressHydrationWarning: true,
//       }
// }

// module.exports = nextConfig
