import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@example.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin1234!', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin User',
        passwordHash,
        role: 'admin'
      }
    });
  }

  const heroCount = await prisma.heroContent.count();
  if (heroCount === 0) {
    await prisma.heroContent.create({
      data: {
        title: 'Launch your next idea faster',
        subtitle: 'A clean, responsive landing page ready to convert visitors into leads.',
        ctaText: 'Contact Us',
        ctaUrl: '#contact',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop'
      }
    });
  }

  const featureCount = await prisma.feature.count();
  if (featureCount === 0) {
    await prisma.feature.create({
      data: {
        title: 'Fast Setup',
        description: 'Launch quickly with a clean scaffold and ready-made components.',
        icon: '⚡'
      }
    });
    await prisma.feature.create({
      data: {
        title: 'Responsive Design',
        description: 'Looks great on any screen size with a mobile-first layout.',
        icon: '📱'
      }
    });
    await prisma.feature.create({
      data: {
        title: 'Secure APIs',
        description: 'Built-in validation and admin protection for critical routes.',
        icon: '🔒'
      }
    });
  }

  const contactCount = await prisma.contactMessage.count();
  if (contactCount === 0) {
    await prisma.contactMessage.create({
      data: {
        name: 'Jordan Lee',
        email: 'jordan@example.com',
        message: 'Hi! I am interested in learning more about your offering.'
      }
    });
    await prisma.contactMessage.create({
      data: {
        name: 'Taylor Smith',
        email: 'taylor@example.com',
        message: 'Please send pricing details and a quick demo link.'
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
