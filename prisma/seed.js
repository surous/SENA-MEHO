const { PrismaClient } = require("./client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Clean database
  await prisma.appointment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin
  await prisma.user.create({
    data: {
      name: "System Admin",
      email: "admin@sena.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create Departments
  const cardiology = await prisma.department.create({
    data: { name: "Cardiology", description: "Heart and blood vessel specialist" },
  });

  // Create Doctor Sena
  const doctorSena = await prisma.user.create({
    data: {
      name: "Dr. Sena",
      email: "sena@sena.com",
      password: hashedPassword,
      role: "DOCTOR",
      doctor: {
        create: {
          departmentId: cardiology.id,
          specialty: "Founder & Chief Medical Officer",
        },
      },
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
