import { Router } from 'express';
import { AuthRoutes } from './route/auth.route';
import { CommentRoutes } from './route/comment.route';
import { PaymentRoutes } from './route/payment.route';
import { PostRoutes } from './route/post.route';
import { UserRoutes } from './route/user.route';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleRoutes = [
  {
    path: '/auth/signup',
    route: UserRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/auth/signin',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
