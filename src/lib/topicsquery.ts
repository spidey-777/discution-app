
import { prisma } from '@/lib';

export const fetchTopics = async () =>{
    return prisma.topic.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            _count: {
                select: { posts: true }
            }
        }
    });

}