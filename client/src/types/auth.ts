export type LoginInputs = {
	username: string;
	password: string;
};

export type RegsiterInputs = {
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type AuthUser = {
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	accessToken: string;
	roles: string[];
	active: boolean;
	id: string;
};
