export type AuthStateType = {
	success: boolean;
	message: string;
	errors?: Record<string, string>;
};

export type AuthResult = {
	success: boolean;
	message: string;
	errors?: Record<string, string[]>;
};
