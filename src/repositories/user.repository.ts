import { Repository } from "typeorm";
import { User } from "../entites/user.entity";
import { IUserRepository } from "./Iuser.repository";
import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";

export class UserRepository implements IUserRepository {
	private repository: Repository<User>;
	constructor(repository: Repository<User>) {
		this.repository = repository;
	}

	public async createUser(
		name: string,
		email: string,
		passwordHash: string
	): Promise<User> {
		try {
			const user = new User(email, passwordHash, name);
			const createdUser = await this.repository.save(user);
			return createdUser;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	public async findOneByEmail(email: string): Promise<User | null> {
		try {
			const user = await this.repository.findOne({
				where: {
					email: email,
				},
			});
			return user;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async deleteOneById(id: number): Promise<boolean | null> {
		try {
			const deleted = await this.repository.softDelete(id);
			if (!deleted) {
				throw new Error("Error deleting User");
			}
			return true;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async findOneById(id: number): Promise<User | null> {
		try {
            const foundUser = await this.repository.findOne({
                where:{
                    id:id
                }
            })
            return foundUser;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

    async updateUser(dto: UserCreateOrUpdateDTO): Promise<User | null> {
        try {
            const user = await this.repository.findOne({
                where:{
                    id:dto.id
                }
            })
            if(!user){
                throw new Error("User not found")
            }
            Object.assign(user, dto);
            const updatedUser = await this.repository.save(user);
            return updatedUser;
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

	async updatePassword(userObject: User): Promise<User | null> {
		try {
			const user = await this.repository.save(userObject);
			return user;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
