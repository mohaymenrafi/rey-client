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

export type RegsiterPostInputs = {
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	password: string;
	roles: string[];
	active: boolean;
};

export type AuthUser = {
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	roles: string[];
	active: boolean;
	id: string;
	accessToken: string;
	refreshToken: string;
};
