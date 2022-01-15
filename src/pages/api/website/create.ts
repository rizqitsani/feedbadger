import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '@/lib/prisma';

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (!session?.user?.email)
      return res.status(401).send({ message: 'Unauthorized' });

    const response = await prisma.website.create({
      data: {
        name: req.body.name,
        url: req.body.url,
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });

    res.status(200).json(response);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
