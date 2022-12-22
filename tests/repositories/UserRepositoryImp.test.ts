import { PrismaClient } from "@prisma/client";

describe("Create User Repository", () => {
    let prismaClient: PrismaClient;
    
    beforeAll(async () => {
        prismaClient = new PrismaClient();
    
        await prismaClient.$connect();
      });
    
      beforeEach(async () => {
        await prismaClient.user.deleteMany();
      });
    
      afterAll(async () => {
        await prismaClient.user.deleteMany();
        await prismaClient.$disconnect();
      });

it("create_whenPassUserValid_returnSuccess", async () => {
        const user = await prismaClient.user.create({
            data: {
              name: "any_name",
              username: "any_username",
              email: "any_email@email.com",
            },
            select: {
              id: true,
              email: true,
              name: true,
            },
          });

    expect(user).toHaveProperty('id');
    expect(user.email).toEqual("any_email@email.com")

 });  
it("findOne_whenPassEmailValid_returnSuccess", async () => {
  await prismaClient.user.create({
      data: {
        name: "any_name",
        username: "any_username",
        email: "any_email@email.com",
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  const user = await prismaClient.user.findUnique({
  where: {
  email: "any_email@email.com",
  }
})
  expect(user).toHaveProperty('email');

});  
it("findOne_whenPassUsernameValid_returnSuccess", async () => {
  await prismaClient.user.create({
    data: {
      name: "any_name",
      username: "any_username",
      email: "any_email@email.com",
    },
    select: {
    id: true,
    email: true,
    name: true,
    },
  });
const user = await prismaClient.user.findUnique({
  where: {
    username: "any_username",
}
})
  expect(user).toHaveProperty('username');

});  
})