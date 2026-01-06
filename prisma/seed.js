const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.prescription.deleteMany();
  await prisma.medicalNote.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();

  // Create Departments
  const emergency = await prisma.department.create({
    data: { name: 'Emergency', description: 'Immediate medical attention for acute illnesses and injuries.' },
  });
  const opd = await prisma.department.create({
    data: { name: 'Outpatient Department (OPD)', description: 'Diagnostic services and medical treatments without overnight stay.' },
  });
  const cardiology = await prisma.department.create({
    data: { name: 'Cardiology', description: 'Heart-related diagnosis and treatment.' },
  });

  // Create Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@sena.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create Doctors
  const doctorPwd = await bcrypt.hash('doctor123', 10);
  const doc1User = await prisma.user.create({
    data: {
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@sena.com',
      password: doctorPwd,
      role: 'DOCTOR',
    },
  });

  const doc1 = await prisma.doctor.create({
    data: {
      userId: doc1User.id,
      departmentId: cardiology.id,
      specialty: 'Senior Cardiologist',
    },
  });

  const doc2User = await prisma.user.create({
    data: {
      name: 'Dr. James Miller',
      email: 'james.miller@sena.com',
      password: doctorPwd,
      role: 'DOCTOR',
    },
  });

  const doc2 = await prisma.doctor.create({
    data: {
      userId: doc2User.id,
      departmentId: emergency.id,
      specialty: 'Emergency Physician',
    },
  });

  // Create Patient
  const patientPwd = await bcrypt.hash('patient123', 10);
  const patientUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: patientPwd,
      role: 'PATIENT',
    },
  });

  const patient = await prisma.patient.create({
    data: {
      userId: patientUser.id,
      dateOfBirth: new Date('1990-05-15'),
      gender: 'Male',
    },
  });

  // Create a sample appointment
  await prisma.appointment.create({
    data: {
      patientId: patient.id,
      doctorId: doc1.id,
      date: new Date(Date.now() + 86400000), // Tomorrow
      status: 'APPROVED',
      reason: 'Regular heart checkup',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
