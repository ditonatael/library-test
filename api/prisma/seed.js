const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const saltRounds = 10;

const booksData = [
  {
    title: "Mari Membaca",
    author: "Budi",
  },
  {
    title: "Mari Bernyanyi",
    author: "Budi",
  },
  {
    title: "Mari Berhitung",
    author: "Budi",
  },
  {
    title: "Mari Bermain",
    author: "Budi",
  },
  {
    title: "Mari Berdansa",
    author: "Budi",
  },
];

const borrowedBookData = [
  {
    book_title: "Mari Bernyanyi",
    user: "user@test.com",
    start_date: new Date("2024-07-29"),
    end_date: new Date("2024-08-06"),
    status: "Returned",
  },
];

const adminUser = [
  {
    email: "admin@library.com",
    password: "Admin123123",
    role: "Admin",
  },
];

async function main() {
  await prisma.books.createMany({ data: booksData });
  await prisma.borrowedBook.createMany({ data: borrowedBookData });

  const hashedAdmin = await Promise.all(
    adminUser.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, saltRounds),
    }))
  );

  await prisma.users.createMany({
    data: hashedAdmin,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
