/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    //aqui agregamos la variable de ambiente, para tener mas seguridad. Esta sera usada para consultas sobre lo que esta en la blockchain
    STAGING_ALCHEMY_KEY:
    "https://eth-sepolia.g.alchemy.com/v2/KbUl8a8rrYHVaImIvXG5c7VQqSKUdz_R"
  }
}

module.exports = nextConfig
