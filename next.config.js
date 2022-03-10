const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    // Important: return the modified config
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "#": path.resolve(__dirname, "src/common"),
    };

    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === "object")
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (/css-loader\/(?:cjs|dist|src)/.test(moduleLoader.loader)) {
          if (typeof moduleLoader.options.modules === "object") {
            moduleLoader.options.modules = {
              ...moduleLoader.options.modules,
              exportLocalsConvention: "camelCase", // https://github.com/webpack-contrib/css-loader#exportlocalsconvention
            };
          }
        }
      });
    });
    return config;
  },
  images: {
    domains: ["via.placeholder.com", "admin.coinblog.dev.youngit.org"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },
};
