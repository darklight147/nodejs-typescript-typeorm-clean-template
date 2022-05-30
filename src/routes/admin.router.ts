import { Router } from 'express';
import adminController from '../controller/admin.controller';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { Role } from '../types/role.enum';

class AdminRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes() {
		this.router.get(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.allAdmins
		);
		this.router.get(
			'/me',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.currentAdmin
		);

		this.router.put(
			'/:adminId',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.update
		);

		this.router.get(
			'/me/details',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.details
		);
		this.router.post(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.create
		);
		this.router.post('/login', adminController.login);
		this.router.get('/logout', adminController.logout);
		this.router.get(
			'/upload',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.getPresignedUrl
		);
		this.router.get(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.adminById
		);
	}
}

export default new AdminRouter();
