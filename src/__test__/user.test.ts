import { IUserRepository } from "../repositories/Iuser.repository"
import { User } from "../entites/user.entity"
import { UserService } from "../services/user.service";
import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";

describe("User tests, including tests for services and controllers", () => {
    let mockUserService: UserService;
    beforeAll(() => {
        class UserRepositoryMock implements IUserRepository{
            async createUser(name:string, email:string, passwordHash:string):Promise<User>{
                return new User(email, passwordHash, name)
            }
            async findOneByEmail(email: string): Promise<User | null> {
                if(email === "mock@email.com"){
                    return new User("mock@email.com", "123456", "Luke Mock")
                }
                return null;
            }
            async deleteOneById(id: number): Promise<boolean | null> {
                console.log(id)
                return true
            }
            async findOneById(id: number): Promise<User | null> {
                console.log(id)
                return null
            }
            async updateUser(dto: UserCreateOrUpdateDTO): Promise<User | null> {
                console.log(dto)
                return null
            }
        }
        const mockUserRepository = new UserRepositoryMock();
        mockUserService = new UserService(mockUserRepository);
    })
    it("Should create user", async () => {
        const createdUser = await mockUserService.createUser("Luke", "luke@mock.com", "123456")
        expect(createdUser).toBeTruthy();
    })
})