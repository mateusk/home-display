module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f4d9257d828ba13fcffafebadf37b288'),
  },
});
