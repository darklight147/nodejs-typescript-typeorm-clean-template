import { Request, Response } from 'express';
import moment from 'moment';
import { BadRequestException } from '../error/BadRequestException.error';
import { Admin } from '../model/admin';
import adminService from '../service/admin.service';
import awsService from '../service/aws.service';
import jwtService from '../service/jwt.service';
import passwordService from '../service/password.service';
import { Role } from '../types/role.enum';

class AdminController {
	public async currentAdmin(req: Request, res: Response) {
		res.status(200).json(req.currentUser);
	}

	public async allAdmins(req: Request, res: Response) {
		res.status(200).json((await adminService.getAll()).map((admin) => ({ ...admin, password: undefined })));
	}

	public async create(req: Request, res: Response) {
		const { email, password, firstName, lastName } = req.body;

		if (!email || !password || !firstName || !lastName) {
			throw new BadRequestException('Missing required fields');
		}

		if (await adminService.getByEmail(email)) {
			throw new BadRequestException('Email already exists');
		}

		const admin = new Admin();

		admin.email = email;
		admin.password = await passwordService.hashPassword(password);
		admin.firstName = firstName;
		admin.lastName = lastName;

		const newAdmin = await adminService.create(admin);

		res.status(200).json({ ...newAdmin, password: undefined });
	}

	public async adminById(req: Request, res: Response) {
		const userId = req.params.id;

		res.status(200).json({ ...await adminService.getById(userId), password: undefined });
	}

	public async getPresignedUrl(req: Request, res: Response) {
		const { file } = req.query as { file: string };

		if (!file) {
			throw new BadRequestException('Missing file');
		}


		// Get file type from file name
		const fileType = file.split('.').pop() as string;

		// Generate a unique file name
		const fileName = `${new Date().getTime()}/${file.replace(/^.*[\\\/]/, '').split('.').shift()}.${fileType}`;

		// Generate a presigned URL
		const { fields, url, destination } = awsService.getPresignedUrl(fileName);

		res.status(200).json({ fields, url, destination });

	}

	public async login(req: Request, res: Response) {
		const { login, password } = req.body;

		const user = await adminService.getByEmail(login);

		if (!user) {
			throw new BadRequestException('Invalid credentials');
		}

		const isPasswordValid = await passwordService.comparePassword(
			password,
			user.password
		);

		if (!isPasswordValid) {
			throw new BadRequestException('Invalid credentials');
		}

		req.session.access_token = jwtService.sign({
			userId: user.id,
			role: Role.ADMIN,
		});

		req.sessionOptions.expires = moment().add(1, 'day').toDate();
		const refreshToken = jwtService.signRefreshToken({
			userId: user.id,
			role: Role.ADMIN,
		});

		res.status(200).json({ ...user, password: undefined });
	}

	public async logout(req: Request, res: Response) {
		req.session.access_token = undefined;

		res.status(200).json();
	}

	public async details(req: Request, res: Response) {
		const admin = await adminService.getById(req.currentUser?.userId!);

		const adminNoPassword = { ...admin, password: undefined };


		res.status(200).json(adminNoPassword);
	}

	public async update(req: Request, res: Response) {
		const { email, firstName, lastName } = req.body;

		const {adminId} = req.params;

		const admin = await adminService.getById(adminId);

		if (!admin) {
			throw new BadRequestException('Admin not found');
		}

		if (!email || !firstName || !lastName) {
			throw new BadRequestException('Missing required fields');
		}

		admin.email = email;
		admin.firstName = firstName;
		admin.lastName = lastName;
		

		const updatedAdmin = await adminService.update(adminId, admin);

		return res.status(200).json({ ...updatedAdmin, password: undefined });
	}
}

export default new AdminController();
