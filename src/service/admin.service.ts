import { Repository } from 'typeorm';
import { PostgresDataSource } from '../config/datasource.config';
import { Admin } from '../model/admin';

class AdminService {

	private adminRepository: Repository<Admin>;

	constructor() {
		this.adminRepository = PostgresDataSource.getRepository(Admin);
	}

	public async update(adminId: string, admin: Admin) {
		return this.adminRepository.save({ ...admin, id: adminId });
	}
	public async getAll(): Promise<Admin[]> {
		return this.adminRepository.find();
	}

	public async getById(id: string): Promise<Admin | null> {
		return this.adminRepository.findOne({ where: { id } });
	}

	public async create(admin: Admin): Promise<Admin> {
		return this.adminRepository.save(admin);
	}

	public async getByEmail(email: string): Promise<Admin | null> {
		return this.adminRepository.findOneBy({ email });
	}
}

export default new AdminService();
