/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    //API_URI:'http://192.168.100.228:4000/api',
    API_URI:'http://10.0.0.13:4000/api',
    SECRET:'FANILIZBETHANTAÑO'
  }
}

module.exports = nextConfig
