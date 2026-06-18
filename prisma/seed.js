const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const doctorPassword = await bcrypt.hash("doctor123", 10);
  const patientPassword = await bcrypt.hash("patient123", 10);

  // Clean database
  await prisma.prescription.deleteMany();
  await prisma.medicalNote.deleteMany();
  await prisma.healthReport.deleteMany();
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
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create Departments
  const cardiology = await prisma.department.create({
    data: { name: "Cardiology", description: "Heart and blood vessel specialist" },
  });

  // Create Doctor
  const doctorUser = await prisma.user.create({
    data: {
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@sena.com",
      password: doctorPassword,
      role: "DOCTOR",
      image: "/assets/dr_sena_portrait.png",
      doctor: {
        create: {
          departmentId: cardiology.id,
          specialty: "Founder & Chief Medical Officer",
        },
      },
    },
  });

  const patientUser = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: patientPassword,
      role: "PATIENT",
      patient: {
        create: {
          gender: "Male",
          dateOfBirth: new Date("1990-04-12"),
        },
      },
    },
    include: {
      patient: true,
    },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { userId: doctorUser.id },
  });

  if (doctor && patientUser.patient) {
    await prisma.appointment.create({
      data: {
        doctorId: doctor.id,
        patientId: patientUser.patient.id,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        reason: "Routine cardiology consultation",
        status: "APPROVED",
      },
    });

    await prisma.healthReport.create({
      data: {
        patientId: patientUser.patient.id,
        content: "Feeling stable today with mild fatigue after exercise.",
        vitals: JSON.stringify({
          heartRate: "72",
          bloodPressure: "120/80",
          weight: "70",
          sugar: "98",
        }),
      },
    });
  }

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
