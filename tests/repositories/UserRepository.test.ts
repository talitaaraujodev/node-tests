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
             name: "test_name",
             username: 'test_username',
             email: "test@test.com",
            },
            select: {
              id: true,
              email: true,
              name: true,
            },
          });

         expect(user).toHaveProperty('id');
         expect(user.email).toEqual("test@test.com")

 });  
it("findOne_whenPassEmailValid_returnSuccess", async () => {
   await prismaClient.user.create({
      data: {
       name: "test_name",
       username: 'test_username',
       email: "test@test.com",
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  const user = await prismaClient.user.findUnique({
  where: {
  email: "test@test.com",
  }
 })
   expect(user).toHaveProperty('email');

 });  
 it("findOne_whenPassEmailValid_returnSuccess", async () => {
  await prismaClient.user.create({
     data: {
      name: "test_name",
      username: "test_username",
      email: "test@test.com",
     },
     select: {
       id: true,
       email: true,
       name: true,
     },
   });
 const user = await prismaClient.user.findUnique({
  where: {
    username: "test_username",
}
})
  expect(user).toHaveProperty('username');

});  
})